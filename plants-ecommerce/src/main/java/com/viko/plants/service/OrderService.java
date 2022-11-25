package com.viko.plants.service;

import com.viko.plants.dto.OrdersResponse;
import com.viko.plants.request.OrderRequestBody;
import org.springframework.http.ResponseEntity;

public interface OrderService {

    ResponseEntity<String> postOrder(OrderRequestBody request);
    OrdersResponse LoadOrders(String username);
}
