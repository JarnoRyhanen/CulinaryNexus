package com.example.backend.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.model.AppUser;

public interface AppUserRepository extends CrudRepository<AppUser, Long>{
    
    AppUser findByUsername(@Param ("username") String username);
    AppUser findByUserId(@Param ("userId") Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM AppUser u WHERE u.userId = :userId")
    void deleteByUserId(@Param("userId") Long userId);

}
