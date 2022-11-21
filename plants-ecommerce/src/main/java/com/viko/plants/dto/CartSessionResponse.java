package com.viko.plants.dto;

import com.viko.plants.entity.CartSession;
import com.viko.plants.entity.User;
import lombok.Data;

@Data
public class CartSessionResponse {

    private final CartSession cartSession;
}
