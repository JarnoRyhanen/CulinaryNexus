package com.example.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.RecipeType;

public interface RecipeTypeRepository extends CrudRepository<RecipeType, Long> {

    RecipeType findByTypeName(@Param(value = "type_name") String typeName);

}
