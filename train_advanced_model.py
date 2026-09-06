import sys
import numpy as np
import pandas as pd
import joblib

from sklearn.model_selection import GroupKFold
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.ensemble import StackingRegressor
from sklearn.linear_model import RidgeCV
import lightgbm as lgb
import xgboost as xgb

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    data = df.copy()

    data["total_attempts"] = data["correct"] + data["wrong"]
    data["accuracy"] = np.where(data["total_attempts"] > 0, data["correct"] / data["total_attempts"], 0.0)
    data["error_rate"] = 1.0 - data["accuracy"]
    
    data["time_per_attempt"] = np.where(data["total_attempts"] > 0, data["minutes_studied"] / data["total_attempts"], 0.0)
    data["study_intensity"] = data["minutes_studied"] / (data["days_since_last_studied"] + 1.0)
    
    stability = np.log1p(data["minutes_studied"]) * (1.0 + data["accuracy"])
    data["retention_proxy"] = np.exp(-data["days_since_last_studied"] / np.maximum(stability, 0.1))

    student_stats = data.groupby("student_id").agg(
        student_mean_acc=("accuracy", "mean"),
        student_total_time=("minutes_studied", "sum"),
        student_topic_count=("topic", "count"),
        student_acc_std=("accuracy", "std")
    ).reset_index()
    student_stats["student_acc_std"] = student_stats["student_acc_std"].fillna(0.0)

    subject_stats = data.groupby(["student_id", "subject"]).agg(
        subj_mean_acc=("accuracy", "mean"),
        subj_total_time=("minutes_studied", "sum"),
        subj_topic_count=("topic", "count")
    ).reset_index()

    data = data.merge(student_stats, on="student_id", how="left")
    data = data.merge(subject_stats, on=["student_id", "subject"], how="left")

    data["acc_vs_student_avg"] = data["accuracy"] - data["student_mean_acc"]
    data = pd.get_dummies(data, columns=["subject"], drop_first=True)

    return data

def build_stacked_ensemble():
    estimators = [
        (
            "lgb",
            lgb.LGBMRegressor(
                n_estimators=300,
                learning_rate=0.03,
                num_leaves=31,
                subsample=0.8,
                colsample_bytree=0.8,
                random_state=42,
                verbose=-1
            ),
        ),
        (
            "xgb",
            xgb.XGBRegressor(
                n_estimators=250,
                learning_rate=0.03,
                max_depth=5,
                subsample=0.8,
                colsample_bytree=0.8,
                random_state=42,
            ),
        ),
    ]

    final_layer = RidgeCV(alphas=np.logspace(-3, 3, 20))
    model = StackingRegressor(
        estimators=estimators,
        final_estimator=final_layer,
        cv=5,
        n_jobs=-1
    )
    return model

def train(csv_path: str = "student_progress.csv", output_model: str = "esslce_predictor.joblib"):
    df = pd.read_csv(csv_path)
    df = df.dropna(subset=["final_exam_score"])
    
    if len(df) < 10:
        print(f"Insufficient labeled training samples ({len(df)} found). Add more data to {csv_path}.")
        return

    processed = engineer_features(df)

    drop_cols = ["student_id", "topic", "final_exam_score"]
    feature_cols = [c for c in processed.columns if c not in drop_cols]
    
    X = processed[feature_cols]
    y = processed["final_exam_score"]
    groups = processed["student_id"]

    n_splits = min(5, len(groups.unique()))
    gkf = GroupKFold(n_splits=n_splits)

    oof_preds = np.zeros(len(processed))
    print(f"Starting {n_splits}-Fold Group Cross-Validation...")

    for fold, (train_idx, val_idx) in enumerate(gkf.split(X, y, groups=groups), 1):
        X_tr, y_tr = X.iloc[train_idx], y.iloc[train_idx]
        X_va, y_va = X.iloc[val_idx], y.iloc[val_idx]

        fold_model = build_stacked_ensemble()
        fold_model.fit(X_tr, y_tr)
        preds = fold_model.predict(X_va)
        oof_preds[val_idx] = preds

        fold_rmse = np.sqrt(mean_squared_error(y_va, preds))
        fold_r2 = r2_score(y_va, preds)
        print(f"Fold {fold} - RMSE: {fold_rmse:.2f} | R2: {fold_r2:.3f}")

    total_rmse = np.sqrt(mean_squared_error(y, oof_preds))
    total_mae = mean_absolute_error(y, oof_preds)
    total_r2 = r2_score(y, oof_preds)

    print("\n--- Overall Out-of-Fold Performance ---")
    print(f"RMSE: {total_rmse:.2f}")
    print(f"MAE:  {total_mae:.2f}")
    print(f"R2:   {total_r2:.3f}")

    final_pipeline = build_stacked_ensemble()
    final_pipeline.fit(X, y)

    artifact = {
        "model": final_pipeline,
        "feature_cols": feature_cols,
    }
    joblib.dump(artifact, output_model)
    print(f"\nTrained ensemble artifact saved to '{output_model}'.")

if __name__ == "__main__":
    csv_file = sys.argv[1] if len(sys.argv) > 1 else "student_progress.csv"
    train(csv_file)