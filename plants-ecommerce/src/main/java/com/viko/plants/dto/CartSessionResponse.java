package com.viko.plants.dto;

import com.viko.plants.entity.CartItem;
import lombok.Data;

import java.util.Set;

@Data
public class CartSessionResponse {

    private final Integer id;
    private final Float total_price;
    private final Set<CartItem> cartItems;
}
