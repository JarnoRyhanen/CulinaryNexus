import { useState } from 'react'
import { Recipe } from '../types';
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
      <div
        className='xl:p-4 mb-4 gap-2 w-full max-sm:max-h-[20rem] bg-[rgb(255,244,210)] border-b xl:border border-black rounded-2xl
        block md:flex flex-col items-center flex-wrap cursor-pointer focus:ring-orange-500'
        onClick={() => onClick(recipe)}
      >
        <img
          src={recipe.thumbnail_url}
          className='w-full max-sm:max-h-[11rem] max-md:max-h-[15rem] lg:h-[15rem] object-cover xl:rounded-xl shadow-xl'
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
                  {liked ? likedRecipe : recipe.likes}
                </p>
                <HeartIcon filled={liked} onClick={toggleLike} />
              </div>
              <p className='text-sm text-slate-600/90'>{recipe.recipeType}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeCard;