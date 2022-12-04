package com.viko.plants.service;

import com.viko.plants.request.GiftCardRequest;
import org.springframework.http.ResponseEntity;

public interface GiftCardService {
    ResponseEntity<String> postGiftCard(GiftCardRequest request);
}
