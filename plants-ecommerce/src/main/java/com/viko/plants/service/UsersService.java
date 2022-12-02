package com.viko.plants.service;

import com.sun.org.apache.xpath.internal.operations.Bool;
import com.viko.plants.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UsersService {

    ResponseEntity<String> deleteUser(Integer userId);
    ResponseEntity<String> changeRole(Integer userId, boolean roleChange);
}
