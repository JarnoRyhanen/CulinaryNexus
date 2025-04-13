package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.RecipeDto;
import com.example.backend.model.Ingredient;
import com.example.backend.model.Recipe;
import com.example.backend.model.RecipeType;
import com.example.backend.repositories.IngredientRepository;
import com.example.backend.repositories.RecipeRepository;
import com.example.backend.repositories.RecipeTypeRepository;
import com.example.backend.security.UserPrincipal;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;
    
    @Autowired
    private RecipeTypeRepository recipeTypeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private IngredientService ingredientService;

    private List<RecipeDto> castToDtos(List<Recipe> recipes) {
        List<RecipeDto> recipesWithoutSomeInfo = new ArrayList<RecipeDto>();

        for (Recipe recipe : recipes) {
            RecipeDto newRecipe = new RecipeDto(recipe.getTitle(), recipe.getThumbnail_url(),
                    recipe.getRecipeDescription(),
                    recipe.getLikes(), recipe.getGuide(), recipe.getRecipeType().getTypeName(),
                    recipe.getCreator().getUsername(), recipe.getIngredients());

            recipesWithoutSomeInfo.add(newRecipe);
        }
        return recipesWithoutSomeInfo;

    }

    public void addRecipe(RecipeDto recipe) {

        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        System.out.println(recipe.toString());
        RecipeType recipeType = recipeTypeRepository.findByTypeName(recipe.getRecipeType());
        if (recipeType == null) {
            RecipeType newRecipeType = new RecipeType(recipe.getRecipeType());
            recipeTypeRepository.save(newRecipeType);
            recipeType = newRecipeType;
        }

        Recipe newRecipe = new Recipe();
        newRecipe.setTitle(recipe.getTitle());
        newRecipe.setRecipeDescription(recipe.getRecipeDescription());
        newRecipe.setGuide(recipe.getGuide());
        newRecipe.setLikes(0);
        newRecipe.setRecipeType(recipeType);
        newRecipe.setThumbnail_url(recipe.getThumbnail_url());
        newRecipe.setCreator(currentUser.getUser());

        List<Ingredient> ingredients = new ArrayList<>();

        for (Ingredient ingredientDto : recipe.getIngredients()) {
            Ingredient ingredient = new Ingredient();
            if (ingredientRepository.findByIngredientName(ingredientDto.getIngredientName()) == null) {
                Ingredient newIngredient = ingredientService.addIngredient(ingredientDto);
                ingredients.add(newIngredient);
            } else {
                ingredient = ingredientRepository.findByIngredientName(ingredientDto.getIngredientName());
                ingredients.add(ingredient);
            }
        }
        newRecipe.setIngredients(ingredients);
        recipeRepository.save(newRecipe);
    }

    public List<RecipeDto> getRecipes() {

        List<Recipe> recipes = (List<Recipe>) recipeRepository.findAll();
        List<RecipeDto> dtoRecipes = castToDtos(recipes);

        return dtoRecipes;
    }

    public List<RecipeDto> getRecipesByName(String title) {
        List<Recipe> recipes = (List<Recipe>) recipeRepository.searchRecipeByTitle(title);
        return castToDtos(recipes);
    }

    public List<RecipeDto> getRecipesByType(String type) {

        List<Recipe> recipes = (List<Recipe>) recipeRepository.searchRecipeByRecipeType(type);
        return castToDtos(recipes);
    }

    public List<RecipeDto> getRecipesByCreator(String creatorName) {

        List<Recipe> recipes = (List<Recipe>) recipeRepository.searchRecipeByCreator(creatorName);
        return castToDtos(recipes);
    }
}
