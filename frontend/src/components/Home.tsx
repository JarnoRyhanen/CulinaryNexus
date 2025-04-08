import { useEffect, useState } from 'react'
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import RecipeInfo from './RecipeInfo';
import Header from './Header';



const Home = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipes] = useState<Recipe | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch('http://localhost:8080/recipes', {
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
                console.log("response");
                console.log(response);
                return response.json();
            }).then(data => {
                console.log("data");
                console.log(data);
                setRecipes(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handelSelectRecipe = (recipe: Recipe) => {
        setSelectedRecipes(recipe);
    };

    return (
        <>
            <Header isFromHome={true} />
            <div className='mt-[7.5rem] bg-[#FFF8E1] w-screen xl:p-4 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-row flew-wrap justify-between w-screen md:gap-5'>

                    <div className="md:px-8 p-2 block md:grid md:grid-cols-1 xl:flex flex-wrap gap-4 
                overflow-y-scroll custom-scrollbar overflow-x-hidden
                h-dvh w-full md:max-h-[50rem] md:min-w-[25rem] md:max-w-[38rem] xl:w-3/5 xl:h-[50rem] xl:max-w-screen-lg 2xl:max-w-screen-xl">
                        {recipes.map(recipe => (
                        <div key={recipe.id} className="xl:w-[48%]">
                                <RecipeCard recipe={recipe} onClick={handelSelectRecipe} />
                            </div>
                        ))}
                    </div>
                    <div className='bg-emerald-900/90 p-2 m-2 mr-10 max-md:hidden md:min-w-[25rem] md:h-[50rem] md:max-w-[45%] xl:min-w-[27%] xl:max-w-[35%] flex-wrap rounded-2xl sticky top-[7.5rem]'>
                        <RecipeInfo recipe={selectedRecipe} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Home;