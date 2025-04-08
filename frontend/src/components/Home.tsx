import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Recipe = {
    id: number;
    title: string;
    recipeDescription: string;
    guide: string;
    likes: number;
    recipeType: string;
    creator: string;
    ingredients: {
        ingredientName: string;
    }[];
    thumbnail_url: string;
};

const Home = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
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

    return (

        <div className='bg-cyan-700  w-screen h-[100%] p-20'>
            Home, THIS SHOULD ONLY BE VISIBLE AFTER AUTH
            <button onClick={() => navigate("/profile")}>Profile</button>
            <div className="flex justify-stretch mx-8 p-2 flex-wrap">
                {recipes.map(recipe => (
                    <div key={recipe.id} className='p-2 m-4 gap-1 flex flex-col 
                    w-[16rem]  border border-black'>
                        <h1 className="text-3xl font-bold">{recipe.title}</h1>
                        <p>{recipe.recipeDescription}</p>
                        <p>{recipe.guide}</p>
                        <p>{recipe.likes}</p>
                        <p>{recipe.recipeType}</p>
                        <p>{recipe.creator}</p>
                        <p>{recipe.thumbnail_url}</p>
                        <div>
                            <h2 className="text-xl font-semibold">Ingredients:</h2>
                            <ul className="list-disc list-inside">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.ingredientName}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;