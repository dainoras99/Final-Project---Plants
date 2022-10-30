package com.viko.plants.request;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class OrderItemRequest {
    private final String username;
    private final String plantName;
    private final Integer quantity;
}