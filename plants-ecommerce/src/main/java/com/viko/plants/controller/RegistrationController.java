package com.viko.plants.controller;

import com.viko.plants.entity.User;
import com.viko.plants.repository.UserRepository;
import com.viko.plants.request.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="api/v1/registration")
@AllArgsConstructor
public class RegistrationController {

    @Autowired
    private UserRepository repository;

    @PostMapping
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request) {
        try {
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            user.setUsername(request.getUsername());
            user.setFirstname(request.getFirstName());
            user.setLastname(request.getLastName());
            user.setBirthdate(request.getBirthdate());
            repository.save(user);
            return new ResponseEntity<>("Successful Registration", HttpStatus.CREATED);
        }
        catch(Exception exc) {
            System.out.println(exc);
            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
        }
    }
}
