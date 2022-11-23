package com.viko.plants.service;

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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class SessionServiceImpl implements SessionService {

    private CartSessionRepository sessionRepository;
    private UserRepository userRepository;
    private PlantRepository plantRepository;
    private CartSessionItemRepository cartSessionItemRepository;;

    public SessionServiceImpl(CartSessionRepository sessionRepository,
                              UserRepository userRepository,
                              PlantRepository plantRepository,
                              CartSessionItemRepository cartSessionItemRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.plantRepository = plantRepository;
        this.cartSessionItemRepository = cartSessionItemRepository;
    }

    @Override
    @Transactional
    public CartSessionResponse LoadCartSession(String username) {
        User user = findUserByUsername(username);
        CartSession cartSession = new CartSession();
        if (sessionRepository.UserSessionExist(user.getId()) > 0)  cartSession = sessionRepository.findUserSession(user.getId());
        return new CartSessionResponse(cartSession.getId(), cartSession.getTotal_price(), cartSession.getCartItems());
    }

    @Override
    @Transactional
    public CartSessionResponse addCartItem(CartSessionRequest request) {

        User user = findUserByUsername(request.getUsername());
        CartSession cartSession = new CartSession();
        Set<CartItem> cartItems = new LinkedHashSet<>();
        CartItem cartItem = new CartItem();

        if (sessionRepository.UserSessionExist(user.getId()) > 0) {
            cartSession = sessionRepository.findUserSession(user.getId());
            cartItems = cartSession.getCartItems();
            if (samePlantExist(cartSession, request)) {
                cartSession = updateCartItemQuantity(cartSession, request);
                return new CartSessionResponse(cartSession.getId(), cartSession.getTotal_price(), cartSession.getCartItems());
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

        if (cartSession.getTotal_price() == null) cartSession.setTotal_price(plant.getPrice());
        else cartSession.setTotal_price(cartSession.getTotal_price() + plant.getPrice());
        cartSession.setUser(user);

        sessionRepository.save(cartSession);

        return new CartSessionResponse(cartSession.getId(), cartSession.getTotal_price(), cartSession.getCartItems());
    }

    @Override
    @Transactional
    public CartSessionResponse deleteCartItem(Integer cartItemId) {

        Optional<CartItem> optionalCartItem = cartSessionItemRepository.findById(cartItemId);
        CartItem cartItem = optionalCartItem.get();
        CartSession cartSession = cartItem.getCartSession();
        cartSession.setTotal_price(
                    cartItem.getCartSession().getTotal_price() - (cartItem.getPlant().getPrice() * cartItem.getQuantity()));
        cartSessionItemRepository.deleteById(cartItemId);
        sessionRepository.save(cartSession);

        return new CartSessionResponse(cartSession.getId(), cartSession.getTotal_price(), cartSession.getCartItems());
    }

    @Override
    @Transactional
    public CartSessionResponse updateCartItem(Integer cartItemId, Boolean quantityIncrease) {
        Optional<CartItem> optionalCartItem = cartSessionItemRepository.findById(cartItemId);
        CartItem cartItem = optionalCartItem.get();
        CartSession cartSession = cartItem.getCartSession();
        if (quantityIncrease) {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            cartSession.setTotal_price(cartSession.getTotal_price() + cartItem.getPlant().getPrice());
        }
        else {
            cartItem.setQuantity(cartItem.getQuantity() - 1);
            cartSession.setTotal_price(cartSession.getTotal_price() - cartItem.getPlant().getPrice());
        }
        cartSessionItemRepository.save(cartItem);
        sessionRepository.save(cartSession);
        return new CartSessionResponse(cartSession.getId(), cartSession.getTotal_price(), cartSession.getCartItems());
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

        for (CartItem cartItem : cartSession.getCartItems()) {
            if (cartItem.getPlant().getName().equals(request.getPlantName())) {
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                cartSession.setTotal_price(cartSession.getTotal_price() + cartItem.getPlant().getPrice());
                cartSessionItemRepository.save(cartItem);
            }
        }
        sessionRepository.save(cartSession);
        return cartSession;
    }
}

