import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(
    page_title="ESSLCE Study Coach AI",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="collapsed"
)

st.markdown("""
    <style>
        #MainMenu, footer, header {visibility: hidden;}
        .block-container {
            padding: 0rem !important;
            margin: 0rem !important;
            max-width: 100% !important;
        }
        iframe {
            width: 100% !important;
            height: 100vh !important;
            border: none !important;
        }
    </style>
""", unsafe_allow_html=True)

build_dir = os.path.join(os.path.dirname(__file__), "dist")

if os.path.exists(build_dir):
    parent_component = components.declare_component("esslce_coach", path=build_dir)
    parent_component()
else:
    st.error("Build folder not found. Run 'npm run build' first.")
