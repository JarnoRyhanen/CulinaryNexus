package com.example.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.AppUser;

public interface AppUserRepository extends CrudRepository<AppUser, Long>{
    
    AppUser findByUsername(@Param ("username") String username);
    AppUser findByUserId(@Param ("userId") Long userId);

}
