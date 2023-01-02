package com.viko.plants.service;

import org.springframework.http.ResponseEntity;

public interface UsersService {

    ResponseEntity<String> deleteUser(Integer userId);
    ResponseEntity<String> changeRole(Integer userId, boolean roleChange);
}
