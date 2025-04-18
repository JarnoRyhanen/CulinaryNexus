import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import { useNavigate } from 'react-router-dom';

const MyRecipes = () => {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8080/recipes/myrecipes', {
      headers: {
        'Authorization': token ? `Bearer ${token}` : "",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }).then(data => {
        console.log(data);
        
        setRecipes(data);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }

  const handleEditRecipe = (recipe: Recipe) => {
    console.log(recipe);

    navigate(`/create-recipes`, { state: { recipe } });
  };

  return (
    <>
      <Header isFromHome={true} />
      <div className="relative min-h-screen h-full bg-[#FFF8E1] flex flex-col items-center">
        <h1 className="mt-10 text-4xl font-bold text-orange-700 mb-8">My Recipes</h1>
        <div className="w-11/12 bg-white shadow-lg rounded-lg my-4 p-6">
          <div className="text-center text-gray-600 my-4">
            <p className="text-lg">Create new recipes</p>
            <button
              className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
              onClick={() => navigate("/create-recipes")}
            >
              Create New Recipe
            </button>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 
              overflow-y-auto custom-scrollbar max-h-[50rem]"
          > {recipes.map((recipe, index) => (
            <>
              <RecipeCard key={index} recipe={recipe} onClick={handleEditRecipe} />
            </>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRecipes;