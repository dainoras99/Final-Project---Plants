package com.viko.plants.service;

import com.viko.plants.dto.CartSessionResponse;
import com.viko.plants.entity.CartItem;
import com.viko.plants.entity.CartSession;
import com.viko.plants.entity.Plant;
import com.viko.plants.entity.User;
import com.viko.plants.repository.CartSessionRepository;
import com.viko.plants.repository.PlantRepository;
import com.viko.plants.repository.UserRepository;
import com.viko.plants.request.CartSessionRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class SessionServiceImpl implements SessionService {

    private CartSessionRepository sessionRepository;
    private UserRepository userRepository;
    private PlantRepository plantRepository;

    public SessionServiceImpl(CartSessionRepository sessionRepository,
                              UserRepository userRepository,
                              PlantRepository plantRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
    }

    @Override
    @Transactional
    public CartSessionResponse addCartItem(CartSessionRequest request) {

        User user = findUserByUsername(request.getUsername());
        CartSession cartSession = new CartSession();
        Set<CartItem> cartItems = new HashSet<>();
        CartItem cartItem = new CartItem();

        if (sessionRepository.UserSessionExist(user.getId()) > 0) {
            cartSession = sessionRepository.findUserSession(user.getId());
            cartItems = cartSession.getCartItems();
            if (samePlantExist(cartSession, request)) {
                cartSession = updateCartItemQuantity(cartSession, request);
                return new CartSessionResponse(cartSession);
            }
        }

        Plant plant = plantRepository.findByName(request.getPlantName());

        cartItem.setUser(user);
        cartItem.setPlant(plant);
        cartItem.setPlantCategory(plant.getCategory());
        cartItem.setQuantity(1);
        cartItem.setCartSession(cartSession);

        cartItems.add(cartItem);

        cartSession.setCartItems(cartItems);
        cartSession.setTotal_price(cartSession.getTotal_price() + plant.getPrice());
        cartSession.setUser(user);

        sessionRepository.save(cartSession);

        return new CartSessionResponse(cartSession);
    }

    private User findUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }

    private Boolean samePlantExist(CartSession cartSession, CartSessionRequest request) {

        for (CartItem cartItem : cartSession.getCartItems()) {
            if (cartItem.getPlant().getName().equals(request.getPlantName())) {
                return true;
            }
        }
        return false;
    }

    private CartSession updateCartItemQuantity(CartSession cartSession, CartSessionRequest request) {

        cartSession.getCartItems().forEach(cartItem -> {
            if (cartItem.getPlant().getName() == request.getPlantName()) {
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                cartSession.setTotal_price(cartSession.getTotal_price() + cartItem.getPlant().getPrice());
            }
        });
        sessionRepository.save(cartSession);
        return cartSession;
    }
}

