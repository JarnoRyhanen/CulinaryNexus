import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const CreateRecipes = () => {

    const token = localStorage.getItem("token");
    const location = useLocation();
    const recipeToEdit = location.state?.recipe;
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(recipeToEdit || {
        title: '',
        recipeDescription: '',
        guide: '',
        likes: 0,
        recipeType: '',
        creator: "",
        ingredients: [],
        thumbnail_url: ''
    });

    const [ingredientCounter, setIngredientCounter] = useState(0);
    const [ingredients, setIngredients] = useState<{ name: string }[]>(
        recipeToEdit?.ingredients?.map((ingredient: { ingredientName: string }) => ({
            name: ingredient.ingredientName,
        })) || []
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRecipe({ ...recipe, [event.target.name]: event.target.value });
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                setRecipe({ ...recipe, thumbnail_url: reader.result as string });
            };

            reader.readAsDataURL(file);
        }
    };
    const handleIngredientChange = (index: number, field: string, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value,
        };

        setIngredients(updatedIngredients);
        setRecipe({
            ...recipe,
            ingredients: updatedIngredients.map(ingredient => ({ ingredientName: ingredient.name }))
        });
    };

    const handleButtonClick = () => {
        if (ingredientCounter < 20) {
            setIngredientCounter(ingredientCounter + 1);
            setIngredients([...ingredients, { name: '' }]);
        }
    }

    const addEditRecipe = () => {
        event?.preventDefault();
        const endpoint = recipeToEdit ? `http://localhost:8080/recipes/editRecipe` : "http://localhost:8080/newRecipe";
        const method = recipeToEdit ? "PUT" : "POST";
        fetch(endpoint, {
            method: method,
            headers: {
                'Authorization': token ? `Bearer ${token}` : "",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...recipe,
            }),
        })
            .then((response) => {
                if (!recipeToEdit) {
                    return response.json();
                }
            })
            .then(() => {
                if (recipeToEdit) {
                    alert("Recipe modified successfully");
                } else {
                    alert("Recipe added successfully");
                }
                navigate(-1);
            });
    };

    const classes = "my-3 md:my-5 font-medium font-sans text-black placeholder:text-black/50 bg-transparent border-2 text-xs md:text-2xl w-5/6 md:w-3/5 shadow-xl p-2 rounded";

    return (
        <>

            <div className='pt-8 min-h-[48rem] h-fit bg-[#FFF8E1] flex flex-col z-10'>

                <div className='p-4 mx-auto h-fit w-2/3 text-center border-b-2 border-b-orange-800'>
                    {recipeToEdit ? (
                        <h2 className='font-semibold text-2xl'>Edit recipe</h2>
                    ) : (
                        <h2 className='font-semibold text-2xl'>Create your own recipies here!</h2>
                    )}
                </div>

                <form className='w-full h-fit flex flex-col items-center'>

                    <input
                        type='text'
                        placeholder='Title'
                        name="title"
                        value={recipe?.title}
                        onChange={handleChange}
                        className={classes}
                    />
                    <input
                        type='text'
                        placeholder='Description'
                        value={recipe.recipeDescription}
                        onChange={handleChange}
                        name="recipeDescription"
                        className={classes} />

                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageUpload}
                        name="thumbnail"
                        className="h-fit p-2 mt-6 border font-medium font-sans rounded w-5/6 md:w-3/5 shadow-xl"
                    />

                    {recipe.thumbnail_url && (
                        <div className="flex flex-col items-center my-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Uploaded Image Preview:</h3>
                            <img
                                src={recipe.thumbnail_url}
                                alt="Uploaded"
                                className="rounded-lg shadow-lg object-cover w-[20rem] h-[15rem] md:w-[30rem] md:h-[20rem] border-2 border-gray-300"
                            />
                        </div>
                    )}

                    <textarea
                        placeholder='Guide'
                        value={recipe.guide}
                        onChange={handleChange}
                        name="guide"
                        className={`p-3 ${classes} text-base font-normal resize-y`}
                    />

                    <input
                        type='text'
                        placeholder='Recipe type (eg. fast food, snacks etc...)'
                        value={recipe.recipeType}
                        onChange={handleChange}
                        name="recipeType"
                        className={classes} />

                    <div className='flex flex-col justify-start items-start p-2 md:w-3/5 border-2 border-slate-500/70 rounded-xl'>
                        <div className='flex justify-between w-full items-center'>
                            <h3 className='font-medium text-xl '>Ingredients </h3>
                            <button
                                className='bg-orange-500/80 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition'
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleButtonClick();
                                }}>
                                New ingredient
                            </button>
                        </div>

                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex flex-row gap-4 w-full mt-2">
                                <input
                                    type="text"
                                    placeholder="Ingredient name"
                                    value={ingredient.name}
                                    onChange={(e) =>
                                        handleIngredientChange(index, 'name', e.target.value)
                                    }
                                    className="flex-1 my-2 p-2 bg-transparent text-xl border rounded-lg shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                    {recipeToEdit ? (
                        <button
                            className='my-4 bg-orange-500/80 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition'
                            onClick={addEditRecipe}>
                            Edit Recipe
                        </button>
                    ) : (
                        <button
                            className='my-4 bg-orange-500/80 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition'
                            onClick={addEditRecipe}>
                            Add new Recipe
                        </button>
                    )}
                </form>

            </div >

        </>
    )
}

export default CreateRecipes;