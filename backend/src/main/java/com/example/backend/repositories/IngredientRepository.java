package com.example.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.Ingredient;

public interface IngredientRepository extends CrudRepository<Ingredient, Long> {
    Ingredient findByIngredientName(@Param(value = "ingredient_name") String ingredientName);
}
