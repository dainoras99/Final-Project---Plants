package com.viko.plants.request;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class GiftCardRequest {
    private final String name;
    private final String message;
    private final String email;
    private final Float sum;
    private final Integer picture;
}
