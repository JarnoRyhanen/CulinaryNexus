import { useEffect, useState } from 'react';
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
    console.log('Authorization Header:', token ? `Bearer ${token}` : "");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/myrecipes`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : "",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
        console.log(response.json());
        
        
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

  const handleDeleteRecipe = (recipeId: number) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      fetch(`https://culinary-nexus-web-app-culinarynexus.2.rahtiapp.fi/${recipeId}`, {
        method: 'DELETE',
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
          setRecipes(recipes.filter(recipe => recipe.recipeId !== recipeId));
        })
        .catch(error => console.error('Error deleting recipe:', error));
    }
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
            <div key={index} className="relative">
              <RecipeCard recipe={recipe} onClick={handleEditRecipe} />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-red-600 transition"
                onClick={() => handleDeleteRecipe(recipe.recipeId)}
              >
                Delete
              </button>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRecipes;