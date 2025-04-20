package com.example.backend.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.RecipeDto;
import com.example.backend.services.RecipeService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping
@CrossOrigin(origins = { "http://localhost:5173", "https://culinarynexus.onrender.com" })
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @RequestMapping(value = "/recipes", method = RequestMethod.GET)
    public @ResponseBody List<RecipeDto> getRecipes() {
        return recipeService.getRecipes();
    }

    @CrossOrigin(origins = { "http://localhost:5173", "https://culinarynexus.onrender.com" })
    @GetMapping("/recipes/myrecipes")
    public @ResponseBody List<RecipeDto> searchMyRecipes(@RequestHeader("Authorization") String authHeader) {
        System.out.println("Authorization Header: " + authHeader);
        return recipeService.getMyRecipes(authHeader);
    }
    
    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @GetMapping("/recipes/{recipeName}")
    public @ResponseBody List<RecipeDto> searchRecipeByName(@PathVariable String recipeName) {
        return recipeService.getRecipesByName(recipeName);
    }

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @GetMapping("/recipes/types/{typeName}")
    public @ResponseBody List<RecipeDto> searchRecipeByType(@PathVariable String typeName) {
        return recipeService.getRecipesByType(typeName);
    }

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @GetMapping("/recipes/creators/{creatorName}")
    public @ResponseBody List<RecipeDto> searchRecipeByCreator(@PathVariable String creatorName) {
        return recipeService.getRecipesByCreator(creatorName);
    }

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @PostMapping("/newRecipe")
    public ResponseEntity<Map<String, String>> addNewRecipe(@RequestBody RecipeDto recipe) {
        Map<String, String> response = new HashMap<>();

        if (recipe != null) {
            recipeService.addRecipe(recipe);
            response.put("Message", "Recipe added successfully");
        } else {
            response.put("Message", "Provided recipe was null");
        }
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @PutMapping("/recipes/editRecipe")
    public ResponseEntity<String> editRecipe(@RequestBody RecipeDto updatedRecipe) {
        try {
            Long id = updatedRecipe.getRecipeId();
            recipeService.editRecipe(id, updatedRecipe);
            return ResponseEntity.ok("Recipe updated successfully.");
        } catch (IllegalArgumentException | SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @DeleteMapping("/recipes/{recipeId}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Long recipeId) {
        try {
            recipeService.deleteRecipe(recipeId);
            return ResponseEntity.ok("Recipe deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}