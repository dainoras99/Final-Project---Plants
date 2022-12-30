package com.viko.plants.service;

import com.viko.plants.entity.Order;
import com.viko.plants.entity.User;
import com.viko.plants.request.GiftCardRequest;
import com.viko.plants.request.OrderRequestBody;

import javax.mail.MessagingException;

public interface EmailSenderService {

    void sendOrderStatusInformationToUser(Order order, String status);
    void sendGiftCardEmail(GiftCardRequest request, String giftCardNumber) throws MessagingException;
    void sendOrderConfirmationEmail(Order order, User user);

}
