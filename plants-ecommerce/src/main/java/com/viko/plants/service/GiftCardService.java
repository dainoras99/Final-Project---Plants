package com.viko.plants.service;

import com.viko.plants.entity.GiftCard;
import com.viko.plants.request.GiftCardRequest;
import org.springframework.http.ResponseEntity;

import javax.mail.MessagingException;

public interface GiftCardService {
    ResponseEntity<String> postGiftCard(GiftCardRequest request) throws MessagingException;
    GiftCard checkIfCodeValid(String code);
    ResponseEntity<String> updateGiftCard(GiftCard giftCard);
}
