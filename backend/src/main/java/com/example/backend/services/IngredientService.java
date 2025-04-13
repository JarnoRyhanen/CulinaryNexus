package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Ingredient;
import com.example.backend.repositories.IngredientRepository;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public Ingredient addIngredient(Ingredient ingredient) {

        Ingredient newIngredient = new Ingredient();
        newIngredient.setIngredientName(ingredient.getIngredientName());
        newIngredient.setUnit("Grams");
        ingredientRepository.save(newIngredient);
        return newIngredient;
    }

}
