package com.example.backend.domain.role;

import java.util.List;

import com.example.backend.domain.user.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "User_role")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id", nullable = false, updatable = false)
    private Long roleId;

    @Column(name = "role_type", nullable = false, length = 5)
    private String roleType;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userRole", fetch = FetchType.EAGER)
    private List<AppUser> users;

    public UserRole() {
        super();
    }

    public UserRole(String roleType) {
        this.roleType = roleType;
    }

    public Long getRole_id() {
        return roleId;
    }

    public void setRole_id(Long role_id) {
        this.roleId = role_id;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public List<AppUser> getUsers() {
        return users;
    }

    public void setUsers(List<AppUser> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "UserRole [role_id=" + roleId + ", roleType=" + roleType + ", users=" + users + "]";
    }
}
