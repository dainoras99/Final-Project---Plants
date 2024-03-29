package com.viko.plants.controller;

import com.viko.plants.entity.User;
import com.viko.plants.entity.UserRole;
import com.viko.plants.repository.UserRepository;
import com.viko.plants.request.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class RegistrationController {

    @Autowired
    private UserRepository repository;

    @PostMapping("api/v1/login")
    public ResponseEntity<?> login (@RequestBody RegistrationRequest registrationRequest) {
        User user = repository.findByUsername(registrationRequest.getUsername());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (bCryptPasswordEncoder.matches(registrationRequest.getPassword(), user.getPassword())) return ResponseEntity.ok(user);
        return (ResponseEntity<?>) ResponseEntity.internalServerError();
    }

    @PostMapping("api/v1/admin")
    public ResponseEntity<?> adminLogin (@RequestBody RegistrationRequest registrationRequest) {
        User user = repository.findByUsername(registrationRequest.getUsername());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (bCryptPasswordEncoder.matches(registrationRequest.getPassword(), user.getPassword()) && user.getUserRole().equals(user.getUserRole().ADMIN)) return ResponseEntity.ok(user);
        return (ResponseEntity<?>) ResponseEntity.internalServerError();
    }


    @PostMapping("api/v1/registration")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            //
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            String encryptedPassword = bCryptPasswordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPassword);
            //
            List<User> users = repository.findAll();
            for (User tempUser: users) {
                if (tempUser.getUsername().equals(user.getUsername())) {
                    return new ResponseEntity<>("Naudotojas su tokiu slapyvardžiu jau egzistuoja", HttpStatus.CONFLICT);
                }
            }
            user.setUserRole(UserRole.USER);
            repository.save(user);
            return new ResponseEntity<>("Successful Registration", HttpStatus.CREATED);
        }
        catch(Exception exc) {
            System.out.println(exc);
            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
        }
    }
}
