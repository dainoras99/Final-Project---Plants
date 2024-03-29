package com.viko.plants.service;

import com.viko.plants.dto.CartSessionResponse;
import com.viko.plants.request.CartSessionRequest;

public interface SessionService {

    CartSessionResponse LoadCartSession(String username);
    CartSessionResponse addCartItem(CartSessionRequest cartSessionRequest);
    CartSessionResponse deleteCartItem(Integer cartItemId);
    CartSessionResponse updateCartItem(Integer cartItemId, Boolean quantityIncrease);
}
