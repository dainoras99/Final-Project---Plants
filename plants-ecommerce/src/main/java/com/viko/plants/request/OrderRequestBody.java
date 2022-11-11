package com.viko.plants.request;

import com.viko.plants.entity.CartItem;
import com.viko.plants.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class OrderRequestBody {
    private final List<CartItem> cartItems;
    private final Float total;
    private final String username;
}
