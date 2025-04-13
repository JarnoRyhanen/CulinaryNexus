import  { useEffect } from 'react'
import { Recipe } from '../types';

interface RecipeInfoProps {
  recipe: Recipe | null;
}

const RecipeInfo = ({ recipe }: RecipeInfoProps) => {

  useEffect(() => {

  }, [recipe])

  return (
    <>
      {recipe ? (
        <div className='p-4 h-full bg-white rounded-2xl shadow-2xl overflow-y-scroll overflow-x-hidden custom-scrollbar'>
          <div className='flex flex-col items-center gap-4'>
            <p className='text-4xl font-medium'>{recipe?.title}</p>
            <p className='text-md'>{recipe?.creator}</p>
            <img src={recipe.thumbnail_url} className='rounded-2xl w-3/4 object-cover' />
          </div>

          <div className='mt-8 flex flex-col gap-2 mb-4'>
            <h2 className="text-xl font-semibold"> Ingredients:</h2>
            <ul className="list-disc list-inside">
              {recipe?.ingredients.map((ingredient, index) => (
                <li key={index} className='text-lg'>
                  {ingredient.ingredientName}
                </li>
              ))}
            </ul>
          </div>
          <h2 className="text-xl font-semibold"> Guide:</h2>
          <p className='text-base text-wrap'>{recipe.guide}</p>
        </div>
      ) : (
        <p className='text-white text-2xl font-medium items-center'>Click on a recipe to view the information!</p>
      )}
    </>
  )
}

export default RecipeInfo;