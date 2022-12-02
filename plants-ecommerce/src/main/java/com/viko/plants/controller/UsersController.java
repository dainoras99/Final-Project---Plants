package com.viko.plants.controller;

import com.viko.plants.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UsersController {

    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @DeleteMapping("api/v1/users/deleteUser/{userId}")
    public ResponseEntity<String> deletePlant(@PathVariable Integer userId) {
        ResponseEntity<String> response = usersService.deleteUser(userId);
        return response;
    }

    @PutMapping("api/v1/users/changeRole/{userId}")
    public ResponseEntity<String> changeRole(@PathVariable Integer userId, @RequestBody boolean roleChange) {
        ResponseEntity<String> response = usersService.changeRole(userId, roleChange);
        return response;
    }

//    private OrderService orderService;
//
//    public OrderController(OrderService orderService) {
//        this.orderService = orderService;
//    }
//
//
//    @GetMapping("api/v1/{username}/orders")
//    public OrdersResponse userSession(@PathVariable String username) {
//
//        OrdersResponse response = orderService.LoadOrders(username);
//        return response;
//    }
}
