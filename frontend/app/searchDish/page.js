"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiDisc, FiArrowRight } from "react-icons/fi";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async (url) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(url);
      if (!response.data.meals) {
        setError("No recipes found. Try another search!");
      }
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (type) => {
    if (isLoading) return;

    switch (type) {
      case "name":
        query.trim() && fetchRecipes(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        break;
      case "letter":
        if (letter.trim()) {
          /^[A-Za-z]$/.test(letter) 
            ? fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            : setError("Please enter a single letter (A-Z)");
        }
        break;
      case "random":
        fetchRecipes("https://www.themealdb.com/api/json/v1/1/random.php");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white">
      {/* Header */}
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 mt-6">
          Recipe Explorer
          <span className="block text-2xl text-gray-500 mt-2 font-normal">
            Discover Culinary Delights
          </span>
        </h1>

        {/* Search Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
          {/* Search by Name */}
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
            <input
              type="text"
              placeholder="Search by dish name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch("name")}
              className="w-full px-4 py-3 rounded-l-lg outline-none"
            />
            <button
              onClick={() => handleSearch("name")}
              className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </div>

          {/* Search by Letter */}
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
            <input
              type="text"
              placeholder="A"
              maxLength="1"
              value={letter}
              onChange={(e) => setLetter(e.target.value.toUpperCase())}
              className="w-16 px-4 py-3 text-center text-xl font-bold outline-none rounded-l-lg uppercase"
            />
            <button
              onClick={() => handleSearch("letter")}
              className="px-6 py-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
            >
              <span className="font-medium">Letter</span>
            </button>
          </div>

          {/* Random Button */}
          <button
            onClick={() => handleSearch("random")}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <FiDisc className="w-5 h-5" />
            <span>Random</span>
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="text-center mb-6 p-3 bg-red-50 text-red-700 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center mb-6">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((meal) => (
            <motion.div
              key={meal.idMeal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {meal.strMeal}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>{meal.strCategory}</span>
                  <span>{meal.strArea}</span>
                </div>
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Recipe <FiArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && recipes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🍳</div>
            Start by searching for recipes above!
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-600 text-center pb-6">
        <p>
          Powered by TheMealDB
          <br />
          <a 
            href="https://github.com/yourusername" 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}