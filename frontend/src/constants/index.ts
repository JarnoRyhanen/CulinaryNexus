
import CYODFATU from "../assets/hero/CYODFATU.jpg";
import EGF from "../assets/hero/EGF.jpg";
import FTTFI from "../assets/hero/FTTFI.jpg";
import eggdish from "../assets/recipeCard/eggdish.jpg";

export const navigation = [
    {
        id: "0",
        title: "Explore",
        url: "/home",
        showOnHome: true,
    },
    {
        id: "1",
        title: "My recipes",
        url: "/myrecipes",
        showOnHome: true,
    },
    {
        id: "2",
        title: "New account",
        url: "/signup",
        onlyMobile: true,
    },
    {
        id: "3",
        title: "Sign in",
        url: "/login",
        onlyMobile: true,
    },
    {
        id: "4",
        title: "Profile",
        url: "/profile",
        onlyMobile: true,
        showOnHome: true,
    },
];

export const features = [
    {
        id: "1",
        title: "Create your own dished for anyone to use!",
        imageUrl: CYODFATU,
    },
    {
        id: "2",
        title: "Find the tastiest foods imaginable!",
        imageUrl: FTTFI,
    },
    {
        id: "3",
        title: "Explore global flavors!",
        imageUrl: EGF,
    },
]

export const recipeCardTestData = {
    id: "1",
    imageUrl: eggdish,
    title: "Breakfast Burrito",
    description: "Tasty breakfast burrito",
    guide: "This is how you make a breakfast burrito",
    likes: "100",
    creator: "Pertti eräreikä",
    recipeType: "breakfast",
    ingredients: [
        { ingredientName: "Eggs", quantity: "2" },
        { ingredientName: "Tortilla", quantity: "1" },
        { ingredientName: "Cheese", quantity: "50g" },
        { ingredientName: "Salsa", quantity: "2 tbsp" },
        { ingredientName: "Avocado", quantity: "1/2" },
    ],
}
