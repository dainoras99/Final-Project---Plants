package com.viko.plants.request;

import com.viko.plants.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class CartSessionRequest {
    private final String username;
    private final String plantName;
}