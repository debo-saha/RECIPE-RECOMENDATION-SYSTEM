from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Path to dataset
file_path = 'smartrecomendation/dataset/small_dataset_low.csv'

# Ensure dataset is present
if not os.path.isfile(file_path):
    raise FileNotFoundError(f"{file_path} not found. Please upload it before deployment.")

# Load and preprocess dataset
df = pd.read_csv(file_path)

def preprocess_ingredients(ingredient_list):
    if isinstance(ingredient_list, str):
        return ingredient_list
    elif isinstance(ingredient_list, list):
        return ' '.join(ingredient_list)
    return ""

df['NER'] = df['NER'].apply(preprocess_ingredients)

# Vectorize ingredients
vectorizer = CountVectorizer()
ingredient_matrix = vectorizer.fit_transform(df['NER'])

def recommend_recipes(user_ingredients, top_n=5):
    user_input = ' '.join(user_ingredients)
    user_vector = vectorizer.transform([user_input])
    similarities = cosine_similarity(user_vector, ingredient_matrix)
    top_indices = similarities.argsort()[0][-top_n:][::-1]
    return df.iloc[top_indices][['title', 'ingredients', 'directions', 'link']].to_dict(orient='records')

# API endpoint
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    if not data or "ingredients" not in data:
        return jsonify({"error": "Invalid input"}), 400

    user_ingredients = data["ingredients"]
    recommendations = recommend_recipes(user_ingredients)
    return jsonify({"recommended_recipes": recommendations})

# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
