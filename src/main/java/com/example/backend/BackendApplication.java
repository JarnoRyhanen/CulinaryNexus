package com.example.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.backend.model.UserRole;
import com.example.backend.repositories.AppUserRepository;
import com.example.backend.repositories.UserRoleRepository;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner printUsers(AppUserRepository appUserRepository, UserRoleRepository userRoleRepository) {
        return args -> {

            if (userRoleRepository.count() == 0) {
                System.out.println("Creating default user roles...");
                userRoleRepository.save(new UserRole("ADMIN"));
                userRoleRepository.save(new UserRole("USER"));
                System.out.println("Default user roles created.");
            } else {
                System.out.println("User roles already exist.");
            }

            System.out.println("Printing all users:");
            appUserRepository.findAll().forEach(user -> {
                System.out.println("User ID: " + user.getUserId());
                System.out.println("Username: " + user.getUsername());
                System.out.println("Email: " + user.getEmail());
                System.out.println("Role: " + user.getUserRole());
                System.out.println("-------------------");
            });
        };
    }
}