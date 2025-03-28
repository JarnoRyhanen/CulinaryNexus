package com.example.backend.domain.role;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
    List<UserRole> findByRoleType(@Param("roleType") String roleType);
    UserRole findRoleByRoleId(@Param("roleId") Long roleId);
}
