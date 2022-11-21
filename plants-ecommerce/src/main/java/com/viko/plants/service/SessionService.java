package com.viko.plants.service;

import com.viko.plants.dto.CartSessionResponse;
import com.viko.plants.request.CartSessionRequest;

public interface SessionService {

    CartSessionResponse addCartItem(CartSessionRequest cartSessionRequest);
}
