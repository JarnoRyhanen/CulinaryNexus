package com.example.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.Recipe;

public interface RecipeRepository extends CrudRepository<Recipe, Long> {

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    public List<Recipe> searchRecipeByTitle(@Param(value = "title") String title);

}
