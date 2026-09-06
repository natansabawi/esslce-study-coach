import sys
import pandas as pd
import joblib
from train_advanced_model import engineer_features

def predict_student_scores(csv_path="student_progress.csv", model_path="esslce_predictor.joblib"):
    artifact = joblib.load(model_path)
    model = artifact["model"]
    feature_cols = artifact["feature_cols"]

    df = pd.read_csv(csv_path)
    processed = engineer_features(df)

    # Ensure all training feature columns exist
    for col in feature_cols:
        if col not in processed.columns:
            processed[col] = 0

    X = processed[feature_cols]
    preds = model.predict(X)

    results = df[["student_id", "subject", "topic"]].copy()
    results["predicted_score"] = preds.round(1)

    # Calculate overall student predicted average out of 100 and scaled out of 600
    summary = results.groupby("student_id")["predicted_score"].mean().reset_index()
    summary["predicted_total_600"] = (summary["predicted_score"] * 6).round().astype(int)

    print("\n--- Predicted Student Scores ---")
    print(summary.to_string(index=False))
    return results

if __name__ == "__main__":
    csv_file = sys.argv[1] if len(sys.argv) > 1 else "student_progress.csv"
    predict_student_scores(csv_file)