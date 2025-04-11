package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.RecipeDto;
import com.example.backend.model.Recipe;
import com.example.backend.repositories.RecipeRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

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

    public List<RecipeDto> getRecipes() {

        List<Recipe> recipes = (List<Recipe>) recipeRepository.findAll();
        List<RecipeDto> dtoRecipes = castToDtos(recipes);

        return dtoRecipes;
    }

    public List<RecipeDto> getRecipesByName(String title) {

        List<Recipe> recipes = (List<Recipe>) recipeRepository.searchRecipeByTitle(title);

        return castToDtos(recipes);
    }

}
