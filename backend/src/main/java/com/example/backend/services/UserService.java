package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.model.AppUser;
import com.example.backend.repositories.AppUserRepository;
import com.example.backend.repositories.UserRoleRepository;
import com.example.backend.security.JWTGenerator;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private AppUserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JWTGenerator jwtGenerator;

    public UserService(AppUserRepository userRepository, UserRoleRepository userRoleRepository,
            BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<AppUser> getAllUsers() {
        return (List<AppUser>) userRepository.findAll();
    }

    public AppUser getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public AppUser getUserByName(String username) {
        return userRepository.findByUsername(username);
    }

    public AppUser createUser(AppUser user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPassword()));
        user.setPassword(user.getPassword());
        user.setUserRole(userRoleRepository.findRoleByRoleId(3L));
        return userRepository.save(user);
    }

    public String getHashedPassword(String password) {
        return (passwordEncoder.encode(password));
    }

    public AppUser updateUser(AppUser user) {
        if (user == null) {
            throw new UsernameNotFoundException("This user does not exist");
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean authenticate(String username, String password) {
        AppUser user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User does not exist in the database");
        }

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new BadCredentialsException("The password is incorrect");
        }
        return true;
    }

    public AppUser getUserWithJWT(String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new UsernameNotFoundException("Unauthorized access: Invalid or missing token");
            }
            String token = authHeader.substring(7);

            String username = jwtGenerator.getUserNameFromJWT(token);
            if (username == null) {
                throw new UsernameNotFoundException("Unauthorized access: Invalid or missing token");
            }
            AppUser user = userRepository.findByUsername(username);
            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }

            return user;
        } catch (Exception e) {
            throw new UsernameNotFoundException("Unauthorized access: Invalid or missing token");
        }
    }
}