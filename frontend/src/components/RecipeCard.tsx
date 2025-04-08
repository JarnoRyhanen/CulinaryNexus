import React, { useState } from 'react'
import { Recipe } from '../types';
import { recipeCardTestData } from '../constants';
import HeartIcon from '../assets/HeartIcon';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {

  const [liked, setLiked] = useState(false);
  const likedRecipe = recipe.likes + 1;
  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <>
      <div className='p-2 m-2 gap-1 w-[27rem] h-full bg-[rgb(255,244,210)] border border-black rounded-2xl
       flex flex-col items-center cursor-pointer'
        onClick={() => onClick(recipe)}
      >
        <img src={recipeCardTestData.imageUrl}
          className='w-full max-h-[18rem] object-fi rounded-xl shadow-xl'
        />

        <div className='mt-1 flex flex-col items-center gap-4 w-full'>
          <h1 className="text-2xl font-bold">{recipe.title}</h1>

          <div className='flex flex-row justify-between w-full px-4 -mt-1'>
            <div className='flex flex-col'>
              <p className='text-lg font-medium'>{recipe.recipeDescription}</p>
              <p className='text-gray-600/80'>By: {recipe.creator}</p>
            </div>

            <div className='flex flex-col items-end gap-1'>
              <div className='flex items-center gap-2'>
                <p className='font-medium text-md'>
                  {liked ? (
                    likedRecipe
                  ) : (
                    recipe.likes
                  )}
                </p>
                <HeartIcon filled={liked} onClick={toggleLike} />
              </div>
              <p className='text-sm text-slate-600/90'>{recipe.recipeType}</p>
            </div>
          </div>
        </div>
      </div>
    </>)
}

export default RecipeCard;