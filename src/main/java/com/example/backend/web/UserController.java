package com.example.backend.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.AppUser;
import com.example.backend.model.LoginRequest;
import com.example.backend.security.JWTGenerator;
import com.example.backend.services.UserService;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping
@CrossOrigin(origins = {"http://localhost:5173", "https://culinarynexus.onrender.com"})
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @CrossOrigin(origins = {"http://localhost:5173", "https://culinarynexus.onrender.com"})
    @PostMapping("/signin")
    public ResponseEntity<Map<String, String>> createUser(@RequestBody AppUser user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        if (userService.usernameExists(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Username already exists. Please choose a different username."));
        }

        String token = jwtGenerator.generateToken(user.getUsername());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "Sign in was successful");
        userService.createUser(user);
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
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

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @RequestMapping(value = "/current-user")
    public ResponseEntity<AppUser> getCurrentUser(@RequestHeader("Authorization") String authHeader) {

        AppUser currentUser = userService.getUserWithJWT(authHeader);
        return ResponseEntity.ok(currentUser);
    }

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public @ResponseBody List<AppUser> getUsers(@RequestHeader("Authorization") String authHeader) {
        return userService.getAllUsers();
    }

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @DeleteMapping("/delete-account")
    public ResponseEntity<String> deleteAccount(@RequestHeader("Authorization") String authHeader) {
        try {
            userService.deleteUser(authHeader);
            return ResponseEntity.ok("Account deleted successfully.");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete account.");
        }
    }

    @CrossOrigin(origins = "https://culinarynexus.onrender.com")
    @PutMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestHeader("Authorization") String authHeader,
            @RequestBody AppUser user) {

        AppUser currentUser = userService.getUserWithJWT(authHeader);

        if (currentUser == null) {
            throw new UsernameNotFoundException("Provided user is null");
        }

        String newPassword = user.getPassword();

        if (newPassword == null || newPassword.isEmpty()) {
            throw new BadCredentialsException("The provided password is null or empty");
        }
        
        currentUser.setPassword(newPassword);
        userService.resetPassword(currentUser.getUsername(), newPassword);

        Map<String, String> response = new HashMap<>();
        response.put("New password", newPassword);
        response.put("Message", "Password successfully updated");

        return ResponseEntity.ok(response);
    }

}
