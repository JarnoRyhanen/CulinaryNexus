package com.example.backend.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.domain.ingredient.Ingredient;
import com.example.backend.domain.ingredient.IngredientRepository;
import com.example.backend.domain.recipe.Recipe;
import com.example.backend.domain.recipe.RecipeRepository;
import com.example.backend.domain.role.UserRole;
import com.example.backend.domain.role.UserRoleRepository;
import com.example.backend.domain.user.AppUser;
import com.example.backend.domain.user.AppUserRepository;
import com.example.backend.services.UserService;

import jakarta.security.auth.message.AuthException;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;


    @Autowired
    private IngredientRepository ingredientRepository;

    
    @CrossOrigin
    @RequestMapping(value = "/recipes", method = RequestMethod.GET)
    public @ResponseBody List<Recipe> getRecipes() {
        return (List<Recipe>) recipeRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/ingredients", method = RequestMethod.GET)
    public @ResponseBody List<Ingredient> getIngredients() {
        return (List<Ingredient>) ingredientRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/message")
    public String getMessage() {
        return "HELLO BACKEND";
    }
}
