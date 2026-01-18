import google.generativeai as genai
import os

key = "AIzaSyC5NwM5j_ErLaho-3wCUcnmI1JxyoJ0OQw"
genai.configure(api_key=key)

print(f"Testing key: {key[:10]}...")

try:
    print("Listing available models...")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
except Exception as e:
    print(f"Error: {e}")
