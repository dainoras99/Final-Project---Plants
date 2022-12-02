package com.viko.plants.request;

import com.viko.plants.entity.CartItem;
import com.viko.plants.entity.CartSession;
import com.viko.plants.entity.Delivery;
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
    private final CartSession cartSession;
    private final String username;
    private final String orderType;
    private final Integer orderTypeId;
    private final Delivery delivery;
}
