import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';



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

        <div className='bg-[#FFF8E1] w-screen h-[100%] m-4 p-4'>
            <button onClick={() => navigate("/profile")}>Profile</button>

            <div className="flex justify-between px-12 p-2 flex-wrap gap-4 xl:max-w-screen-lg 2xl:max-w-screen-xl">
                {recipes.map(recipe => (
                    <div key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;