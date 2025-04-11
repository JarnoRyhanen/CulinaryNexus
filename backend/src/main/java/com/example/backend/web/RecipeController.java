package com.example.backend.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.RecipeDto;
import com.example.backend.model.Ingredient;
import com.example.backend.repositories.IngredientRepository;
import com.example.backend.services.RecipeService;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping
public class RecipeController {
    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private RecipeService recipeService;

    
    @CrossOrigin
    @RequestMapping(value = "/recipes", method = RequestMethod.GET)
    public @ResponseBody List<RecipeDto> getRecipes() {
        return recipeService.getRecipes();
    }

    @CrossOrigin
    @RequestMapping(value = "/ingredients", method = RequestMethod.GET)
    public @ResponseBody List<Ingredient> getIngredients() {
        return (List<Ingredient>) ingredientRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/recipes/{recipeName}")
    public @ResponseBody List<RecipeDto> searchRecipeByName(@PathVariable String recipeName) {
        return recipeService.getRecipesByName(recipeName);
    }
}
