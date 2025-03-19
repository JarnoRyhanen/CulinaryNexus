package com.example.backend.domain.user;

import java.util.List;

import com.example.backend.domain.recipe.Recipe;
import com.example.backend.domain.role.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "App_user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @Column(name = "username", unique = true, nullable = false, length = 40)
    private String username;

    @Column(name = "user_email", unique = true, nullable = false, length = 50)
    private String email;

    @ManyToOne
    @JoinColumn(name = "user_role", nullable = false)
    private UserRole userRole;

    @Column(name = "user_password", nullable = false, length = 255)
    private String password;

    @OneToMany(mappedBy = "creator")
    private List<Recipe> createdRecipes;

    public AppUser() {
        super();
    }

    public AppUser(String username, String email, UserRole userRole, String password) {
        this.username = username;
        this.email = email;
        this.userRole = userRole;
        this.password = password;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AppUser [userId=" + userId + ", username=" + username + ", email=" + email + ", userRole=" + userRole.getRoleType()
                + ", password=" + password + "]";
    }



    // Constructors, getters, setters...

}