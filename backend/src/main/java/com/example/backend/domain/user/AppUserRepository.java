package com.example.backend.domain.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AppUserRepository extends CrudRepository<AppUser, Long>{
    AppUser findByUsername(@Param ("username") String username);
}
