package com.example.backend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.backend.model.Ingredient;

public interface IngredientRepository extends CrudRepository<Ingredient, Long> {

}
