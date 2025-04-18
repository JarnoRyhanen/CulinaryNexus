export type Recipe = {
    recipeId: number;
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