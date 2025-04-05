package com.example.backend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.backend.model.Recipe;

public interface RecipeRepository extends CrudRepository<Recipe, Long>{
    
}
