package com.example.backend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.backend.model.RecipeType;

public interface RecipeTypeRepository extends CrudRepository<RecipeType, Long> {

}
