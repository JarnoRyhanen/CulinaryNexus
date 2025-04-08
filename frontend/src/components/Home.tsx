import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import RecipeInfo from './RecipeInfo';



const Home = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipes] = useState<Recipe | null>(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


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

        <div className='bg-[#FFF8E1] w-screen h-[100%] m-2 p-4 overflow-y-auto overflow-x-hidden'>
            <button onClick={() => navigate("/profile")}>Profile</button>
            <div className='flex flex-row w-screen'>
                <div className="px-8 p-2 flex justify-between 
                overflow-y-scroll custom-scrollbar
                h-[50rem] flex-wrap gap-4 xl:max-w-screen-lg 2xl:max-w-screen-xl">
                    {recipes.map(recipe => (
                        <div key={recipe.id}>
                            <RecipeCard recipe={recipe} onClick={handelSelectRecipe} />
                        </div>
                    ))}
                </div>
                <div className='bg-emerald-900/90 h-[50rem] p-2 m-2 mr-10 xl:w-[31%] flex-wrap rounded-2xl sticky top-[4.5rem]'>
                    <RecipeInfo recipe={selectedRecipe} />
                </div>
            </div>
        </div >
    )
}

export default Home;