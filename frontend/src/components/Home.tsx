import { useEffect, useState } from 'react'
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import RecipeInfo from './RecipeInfo';
import Header from './Header';
import HomeHero from './HomeHero';
import Search from './Search';

const Home = () => {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipes] = useState<Recipe | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const token = localStorage.getItem("token");

    const fetchData = () => {
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
                return response.json();
            }).then(data => {
                setRecipes(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile && selectedRecipe) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedRecipe]);

    const handleSelectRecipe = (recipe: Recipe) => {
        setSelectedRecipes(recipe);
    };

    const handleSearchResults = (data: Recipe[]) => {
        if (data.length == 0) {
            setRecipes([]);
        } else {
            setRecipes(data);
        }
    };

    return (
        <>
            <Header isFromHome={true} />
            <HomeHero />
            <Search onSearchResults={handleSearchResults} />
            <div className=' bg-[#FFF8E1] w-screen xl:p-4 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-row flew-wrap justify-between w-screen md:gap-5'>
                    <div className={`md:px-8 p-2 block md:grid md:grid-cols-1 xl:flex flex-wrap gap-4 
                overflow-y-scroll custom-scrollbar overflow-x-hidden ${selectedRecipe ? "overflow-hidden" : ""} 
                h-dvh w-full md:max-h-[50rem] md:min-w-[25rem] md:max-w-[38rem] xl:w-3/5 xl:h-[50rem] xl:max-w-screen-lg 2xl:max-w-screen-xl`}>
                        {recipes.map((recipe, index) => (
                            <div key={index} className="xl:w-[48%]">
                                <RecipeCard recipe={recipe} onClick={handleSelectRecipe} />
                            </div>
                        ))}
                    </div>

                    {isMobile ? (
                        <>
                            {selectedRecipe && (
                                <div className="fixed inset-0 bg-black/80 z-40"></div>
                            )}
                            <div className={`${selectedRecipe ? "" : "hidden"}
                   fixed inset-0 flex items-center justify-center z-50`}>
                                <div className="w-11/12 max-w-md h-5/6 bg-white p-4 rounded-2xl shadow-lg flex flex-col">
                                    <button
                                        className="self-end text-gray-500 hover:text-gray-700"
                                        onClick={() => setSelectedRecipes(null)}
                                    >
                                        <span className='text-2xl font-extrabold text-black'>✕</span>
                                    </button>
                                    <div className="w-full max-h-[80vh] overflow-auto">
                                        <RecipeInfo recipe={selectedRecipe} />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='bg-emerald-900/90 p-4 m-2 mr-14 max-md:hidden md:min-w-[25rem] md:h-[50rem] md:max-w-[45%] xl:min-w-[27%] xl:max-w-[35%] flex-wrap rounded-2xl sticky top-[7.5rem]'>
                            <RecipeInfo recipe={selectedRecipe} />
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default Home;