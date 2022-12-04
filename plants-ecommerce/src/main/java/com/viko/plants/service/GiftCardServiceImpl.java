package com.viko.plants.service;

import com.viko.plants.repository.GiftCardRepository;
import com.viko.plants.request.GiftCardRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class GiftCardServiceImpl implements GiftCardService {

    private GiftCardRepository giftCardRepository;

    public GiftCardServiceImpl(GiftCardRepository giftCardRepository) {
        this.giftCardRepository = giftCardRepository;
    }

    @Override
    @Transactional
    public ResponseEntity<String> postGiftCard(GiftCardRequest request){
        System.out.println(request);
        return new ResponseEntity<>("Dovanų kupono užsakymas pateiktas!", HttpStatus.CREATED);
    }
}
