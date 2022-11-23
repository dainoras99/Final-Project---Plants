package com.viko.plants.controller;

import com.viko.plants.dto.CartSessionResponse;
import com.viko.plants.entity.CartItem;
import com.viko.plants.entity.CartSession;
import com.viko.plants.entity.Plant;
import com.viko.plants.entity.User;
import com.viko.plants.repository.CartSessionItemRepository;
import com.viko.plants.repository.CartSessionRepository;
import com.viko.plants.repository.PlantRepository;
import com.viko.plants.repository.UserRepository;
import com.viko.plants.request.CartSessionRequest;
import com.viko.plants.service.SessionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CartSessionController {

    private SessionService sessionService;

    public CartSessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("api/v1/createSession")
    public CartSessionResponse createSession(@RequestBody CartSessionRequest request) {

        CartSessionResponse response = sessionService.addCartItem(request);
        return response;
    }

    @GetMapping("api/v1/userSession/{username}")
    public CartSessionResponse userSession(@PathVariable String username) {

        CartSessionResponse response = sessionService.LoadCartSession(username);
        return response;
    }

    @DeleteMapping("api/v1/deleteCartItem")
    public CartSessionResponse deleteCartItem(@RequestParam(value="id", required=true) Integer cartItemId) {

        CartSessionResponse response = sessionService.deleteCartItem(cartItemId);
        return response;
    }

    @PutMapping("api/v1/updateCartItem")
    public CartSessionResponse updateCartItem(@RequestParam(value="id", required=true) Integer cartItemId,
                                              @RequestBody Boolean quantityIncrease) {
        CartSessionResponse response = sessionService.updateCartItem(cartItemId, quantityIncrease);
        return response;
    }
//    @DeleteMapping("api/v1/deleteCartItem")
//    public ResponseEntity<?> deleteCartItem(@RequestParam(value="id", required=true) int id) {
//        try {
//            Optional<CartItem> optionalCartItem = cartSessionItemRepository.findById(id);
//            CartItem cartItem = optionalCartItem.get();
//            CartSession cartSession = cartItem.getCartSession();
//            cartSession.setTotal_price(
//                    cartItem.getCartSession().getTotal_price() - (cartItem.getPlant().getPrice() * cartItem.getQuantity()));
//            cartSessionItemRepository.deleteById(id);
//            cartRepository.save(cartSession);
//            return new ResponseEntity<>("Augalas pašalintas iš krepšelio", HttpStatus.OK);
//        }
//        catch(Exception exc) {
//            return new ResponseEntity<>("an error has occured", HttpStatus.BAD_REQUEST);
//        }
//    }
//    @PutMapping("api/v1/updateCartItem")
//    public ResponseEntity<?> updateCartItem(@RequestParam(value="id", required=true) int id, @RequestBody Boolean quantityPlus) {
//        Optional<CartItem> optionalCartItem = cartSessionItemRepository.findById(id);
//        CartItem cartItem = optionalCartItem.get();
//        CartSession cartSession = cartItem.getCartSession();
//        if (quantityPlus) {
//            if (cartItem.getQuantity() == 50) return new ResponseEntity<>("Didžiausias kiekis jau pasiektas", HttpStatus.BAD_REQUEST);
//            cartItem.setQuantity(cartItem.getQuantity() + 1);
//            cartSessionItemRepository.save(cartItem);
//            cartSession.setTotal_price(cartSession.getTotal_price() + cartItem.getPlant().getPrice());
//            cartRepository.save(cartSession);
//            return new ResponseEntity<>("Produkto kiekis padidintas", HttpStatus.OK);
//        }
//        else {
//            if (cartItem.getQuantity() == 1) return new ResponseEntity<>("Mažiausias kiekis jau pasiektas", HttpStatus.BAD_REQUEST);
//            cartItem.setQuantity(cartItem.getQuantity() - 1);
//            cartSessionItemRepository.save(cartItem);
//            cartSession.setTotal_price(cartSession.getTotal_price() - cartItem.getPlant().getPrice());
//            cartRepository.save(cartSession);
//            return new ResponseEntity<>("Produkto kiekis sumažintas", HttpStatus.OK);
//        }
//    }
//
//    @DeleteMapping("api/v1/deleteCartSession")
//    public ResponseEntity<?> deleteCartSession(@RequestParam(value="id", required = true) int id) {
//        try {
//            cartRepository.deleteById(id);
//            return new ResponseEntity<>("Sesija ištrinta", HttpStatus.OK);
//        }
//        catch(Exception exc) {
//            return new ResponseEntity<>("an error has occured", HttpStatus.BAD_REQUEST);
//        }
//    }

}
