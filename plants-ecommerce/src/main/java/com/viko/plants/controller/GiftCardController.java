package com.viko.plants.controller;

import com.viko.plants.dto.CartSessionResponse;
import com.viko.plants.request.CartSessionRequest;
import com.viko.plants.request.GiftCardRequest;
import com.viko.plants.service.EmailSenderService;
import com.viko.plants.service.GiftCardService;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GiftCardController {

    private GiftCardService giftCardService;

    public GiftCardController(GiftCardService giftCardService) {
        this.giftCardService = giftCardService;
    }

    @PostMapping("api/v1/postGiftCard")
    public ResponseEntity<String> postGiftCard(@RequestBody GiftCardRequest request) throws MessagingException {

        ResponseEntity<String> response = giftCardService.postGiftCard(request);
        return response;
    }

}
