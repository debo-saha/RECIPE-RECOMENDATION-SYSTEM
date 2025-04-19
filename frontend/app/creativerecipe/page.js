"use client"

import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addIngredient = () => {
    const ingredient = inputValue.trim();
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setInputValue('');
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  const searchRecipes = async () => {
    if (ingredients.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:5001/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients })
      });
      
      if (!response.ok) throw new Error('Failed to fetch recipes');
      
      const data = await response.json();
      setRecipes(data.recommended_recipes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setIngredients([]);
    setRecipes([]);
    setError(null);
  };

  
   return (
    <div className="min-h-screen bg-white text-black">
      <Head>
        <title>FlavorFinder - Discover Your Perfect Recipe</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@600&display=swap" rel="stylesheet" />
      </Head>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="font-space text-5xl md:text-6xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
            FlavorFinder
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your ingredients into culinary inspiration. Add what you have, and we'll suggest perfect recipes!
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
              placeholder="Enter ingredients (e.g., chicken, tomatoes, garlic)"
              className="flex-1 px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
            />
            <button
              onClick={addIngredient}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
            >
              <i className="fas fa-plus"></i>
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {ingredients.map((ingredient) => (
              <div key={ingredient} className="bg-gradient-to-br from-orange-100 to-amber-50 text-orange-700 px-4 py-2 rounded-lg flex items-center gap-2 border border-orange-100">
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="text-orange-400 hover:text-orange-600 transition-colors"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={searchRecipes}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
            >
              <i className="fas fa-search"></i>
              Find Recipes
            </button>
            <button
              onClick={clearAll}
              className="bg-gray-100 text-gray-600 px-8 py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
            >
              <i className="fas fa-eraser"></i>
              Clear All
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center p-8 space-y-4">
            <div className="animate-pulse">
              <div className="h-12 w-12 bg-orange-100 rounded-full mx-auto mb-4"></div>
            </div>
            <p className="text-gray-500 font-medium">Discovering delicious recipes...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 p-6 rounded-xl text-center border border-red-100">
            <div className="text-red-500 text-3xl mb-3">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h3 className="text-red-600 font-medium mb-2">Oops! Something went wrong</h3>
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={searchRecipes}
              className="text-orange-500 font-medium hover:text-orange-600 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Recipe Results */}
        {!isLoading && !error && (
          <div className="grid gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.title} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{recipe.title}</h2>
        <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-carrot text-orange-500"></i>
            </div>
            <h3 className="font-medium text-gray-700">Ingredients</h3>
          </div>
          <ul className="space-y-2">
            {formatListItems(recipe.ingredients).map((item, i) => (
              <li key={i} className="flex items-start text-gray-600">
                <span className="text-orange-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-list-ol text-orange-500"></i>
            </div>
            <h3 className="font-medium text-gray-700">Directions</h3>
          </div>
          <ol className="space-y-3">
            {formatListItems(recipe.directions).map((step, i) => (
              <li key={i} className="text-gray-600">
                <span className="font-medium text-orange-500 mr-2">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {recipe.link && (
        <div className="border-t border-gray-100 pt-6">
          <a
            href={recipe.link.startsWith('http') ? recipe.link : `https://${recipe.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            <i className="fas fa-external-link-alt"></i>
            View Full Recipe
          </a>
        </div>
      )}
    </div>
  );
}

function formatListItems(items) {
  if (!items) return [];
  if (Array.isArray(items)) return items;
  if (typeof items === 'string') {
    try {
      return JSON.parse(items.replace(/'/g, '"'));
    } catch {
      return [items];
    }
  }
  return [];
}