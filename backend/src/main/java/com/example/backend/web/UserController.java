package com.example.backend.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.AppUser;
import com.example.backend.model.LoginRequest;
import com.example.backend.repositories.AppUserRepository;
import com.example.backend.security.JWTGenerator;
import com.example.backend.services.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @Autowired
    private AppUserRepository appUserRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/signin")
    public AppUser addUser(@RequestBody AppUser user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        return userService.createUser(user);
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginAppUser(@RequestBody LoginRequest loginRequest,
            HttpSession session) {
        try {
            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
            if (isAuthenticated) {
                String token = jwtGenerator.generateToken(loginRequest.getUsername());
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("message", "Login was successful");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid username or password"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication error: " + e.getMessage()));
        }
    }

    @CrossOrigin
    @PostMapping(value = "/current-user")
    public @ResponseBody AppUser getCurrentUser(@RequestBody AppUser user) {

        Long id = appUserRepository.findByUsername(user.getUsername()).getUserId();

        return userService.getUserById(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public @ResponseBody List<AppUser> getUsers(@RequestHeader("Authorization") String authHeader) {
        return userService.getAllUsers();
    }

}
