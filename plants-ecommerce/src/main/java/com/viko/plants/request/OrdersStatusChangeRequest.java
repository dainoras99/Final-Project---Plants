package com.viko.plants.request;

import com.viko.plants.entity.Order;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class OrdersStatusChangeRequest {
    private final List<Order> orders;
    private final String status;
}
