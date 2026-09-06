import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(
    page_title="ESSLCE Study Coach AI",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom styling to make the embedded app full-screen without margins
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        .block-container {
            padding: 0rem !important;
            margin: 0rem !important;
            max-width: 100% !important;
        }
    </style>
""", unsafe_allow_html=True)

# Path to Vite production build
build_dir = os.path.join(os.path.dirname(__file__), "dist")

if os.path.exists(build_dir):
    index_path = os.path.join(build_dir, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        html_code = f.read()
    
    # Render static React bundle
    components.html(html_code, height=1200, scrolling=True)
else:
    st.error("Build directory not found. Please run 'npm run build' before deploying.")
