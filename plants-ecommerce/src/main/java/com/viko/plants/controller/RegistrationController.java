package com.viko.plants.controller;

import com.viko.plants.entity.User;
import com.viko.plants.repository.UserRepository;
import com.viko.plants.request.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class RegistrationController {

    @Autowired
    private UserRepository repository;

    @PostMapping("api/v1/login")
    public ResponseEntity<?> login (@RequestBody RegistrationRequest registrationRequest) {
        System.out.println(registrationRequest.getUsername() + " " + registrationRequest.getPassword());
        User user = repository.findByUsername(registrationRequest.getUsername());
        if (user.getPassword().equals(registrationRequest.getPassword())) return ResponseEntity.ok(user);
        return (ResponseEntity<?>) ResponseEntity.internalServerError();
    }


    @PostMapping("api/v1/registration")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            repository.save(user);
            return new ResponseEntity<>("Successful Registration", HttpStatus.CREATED);
        }
        catch(Exception exc) {
            System.out.println(exc);
            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
        }
    }
}
