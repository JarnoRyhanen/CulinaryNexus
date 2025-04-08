import React, { useEffect } from 'react'
import { Recipe } from '../types';
import { recipeCardTestData } from '../constants';

interface RecipeInfoProps {
  recipe: Recipe | null; // Allow null since no recipe might be selected
}

const RecipeInfo = ({ recipe }: RecipeInfoProps) => {

  useEffect(() => {

  }, [recipe])

  return (
    <>
      {recipe ? (
        <div className='p-4  h-full bg-white rounded-2xl shadow-2xl overflow-y-scroll overflow-x-hidden custom-scrollbar'>
          <div className='flex flex-col items-center gap-4'>
            <p className='text-4xl font-medium'>{recipe?.title}</p>
            <p className='text-md'>{recipe?.creator}</p>
            <img src={recipeCardTestData.imageUrl} className='rounded-2xl w-3/4 object-cover' />
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
          <p className='text-base text-wrap'>
            Preheat oven to 350°F (175°C).
            Heat olive oil in a skillet over medium heat.
            Add onion, bell pepper, celery, and parsley to the skillet and cook until softened, about 5 minutes.
            Stir in salt, pepper, and flour.
            Cook for 1 minute, stirring constantly.
            Gradually whisk in milk and cook until thickened, about 5 minutes.
            Remove from heat and stir in cheese.
            Pour egg mixture into a greased 8-inch square baking dish.
            Bake for 20-25 minutes, or until eggs are set.
            Sprinkle with chives and serve.
            Tips:
            You can use any type of cheese you like.
            If you want a more flavorful eggdish, you can add cooked bacon, ham, or sausage to the egg mixture.
            You can also add other vegetables to the eggdish, such as spinach, mushrooms, or tomatoes.
            If you don't have an 8-inch square baking dish, you can use a 9-inch pie plate.
            The eggdish can be made ahead of time and refrigerated for up to 2 days.
            To reheat, bake at 350°F (175°C) for 10-15 minutes.
            Enjoy!</p>
        </div>
      ) : (
        <p className='text-white text-2xl font-medium items-center'>Click on a recipe to view the information!</p>
      )}
    </>
  )
}

export default RecipeInfo;