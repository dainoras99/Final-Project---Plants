package com.viko.plants.dto;

import com.viko.plants.entity.CartItem;
import com.viko.plants.entity.Order;
import lombok.Data;

import java.util.Set;

@Data
public class OrdersResponse {
    private final Set<Order> orders;
}
