package com.example.backend.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.AppUser;
import com.example.backend.model.LoginRequest;
import com.example.backend.repositories.AppUserRepository;
import com.example.backend.services.UserService;

import jakarta.security.auth.message.AuthException;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private AppUserRepository appUserRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/signin")
    public AppUser addUser(@RequestBody AppUser user) {
        System.out.println("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
        System.out.println(user.getPassword());
        System.out.println(user.getUsername());

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        return userService.createUser(user);
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> loginAppUser(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
            if (isAuthenticated) {
                session.setAttribute("user", loginRequest.getUsername());
                return ResponseEntity.ok().body("");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication error: " + e.getMessage());
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
    @PreAuthorize("isAuthenticated()") // Allow only authenticated users
    public @ResponseBody List<AppUser> getUsers() {
        return userService.getAllUsers();
    }

}
