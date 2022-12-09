package com.viko.plants.service;

import com.viko.plants.entity.Order;
import com.viko.plants.request.GiftCardRequest;

import javax.mail.MessagingException;

public interface EmailSenderService {

    void sendOrderStatusInformationToUser(Order order, String status);
    void sendGiftCardEmail(GiftCardRequest request, String giftCardNumber) throws MessagingException;

}
