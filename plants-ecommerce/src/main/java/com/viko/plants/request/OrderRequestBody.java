package com.viko.plants.request;

import com.viko.plants.entity.CartSession;
import com.viko.plants.entity.Delivery;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

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
