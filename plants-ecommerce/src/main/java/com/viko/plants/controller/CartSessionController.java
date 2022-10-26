package com.viko.plants.controller;

import com.viko.plants.entity.CartItem;
import com.viko.plants.entity.CartSession;
import com.viko.plants.entity.Plant;
import com.viko.plants.entity.User;
import com.viko.plants.repository.CartSessionItemRepository;
import com.viko.plants.repository.CartSessionRepository;
import com.viko.plants.repository.PlantRepository;
import com.viko.plants.repository.UserRepository;
import com.viko.plants.request.CartSessionRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CartSessionController {

    @Autowired
    private CartSessionRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private CartSessionItemRepository cartSessionItemRepository;

    @PostMapping("api/v1/createSession")
    public ResponseEntity<String> createSession(@RequestBody CartSessionRequest cartSessionRequest) {
        try {
            CartItem cartItem = new CartItem();
            Set<CartItem> cartItems = new HashSet<>();
            cartItem.setQuantity(1);
            CartSession existingCartSession = new CartSession();

            CartSession cartSession = new CartSession();
            User user = userRepository.findByUsername(cartSessionRequest.getUsername());
            Plant plant = plantRepository.findByName(cartSessionRequest.getPlantName());

            cartItem.setPlantCategory(plant.getCategory());
            cartItem.setUser(user);
            cartItem.setPlant(plant);
            cartItems.add(cartItem);

            if (cartSessionItemRepository.findAllSessionCartItems(user.getId()).size() > 0) {
                for (CartItem cartTempItem : cartSessionItemRepository.findAllSessionCartItems(user.getId())) {
                    if (cartTempItem.getPlant().getName() == cartItem.getPlant().getName()) {
                        cartItem.setQuantity(cartTempItem.getQuantity() + 1);
                        cartSessionItemRepository.delete(cartTempItem);
                    }
                    existingCartSession = cartTempItem.getCartSession();
                }
                existingCartSession.setTotal_price(existingCartSession.getTotal_price() + cartItem.getPlant().getPrice());
                cartItem.setCartSession(existingCartSession);
                cartSessionItemRepository.save(cartItem);
                return new ResponseEntity<>("Sesija jau egzistuoja, pridedamas naujas produktas", HttpStatus.OK);
            }
            cartSession.setUser(user);
            cartSession.setCartItems(cartItems);
            cartSession.setTotal_price(cartItem.getPlant().getPrice());


            cartItem.setCartSession(cartSession);
            cartRepository.save(cartSession);
            return new ResponseEntity<>("Nauja sesija sukurta", HttpStatus.CREATED);
        }
        catch(Exception exc) {
            System.out.println(exc);
            return new ResponseEntity<>("An error occured", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("api/v1/deleteCartItem")
    public ResponseEntity<?> deleteCartItem(@RequestParam(value="id", required=true) int id) {
        try {
            cartSessionItemRepository.deleteById(id);
            return new ResponseEntity<>("Augalas pašalintas iš krepšelio", HttpStatus.OK);
        }
        catch(Exception exc) {
            return new ResponseEntity<>("an error has occured", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("api/v1/deleteCartSession")
    public ResponseEntity<?> deleteCartSession(@RequestParam(value="id", required = true) int id) {
        try {
            cartRepository.deleteById(id);
            return new ResponseEntity<>("Sesija ištrinta", HttpStatus.OK);
        }
        catch(Exception exc) {
            return new ResponseEntity<>("an error has occured", HttpStatus.BAD_REQUEST);
        }
    }

}
