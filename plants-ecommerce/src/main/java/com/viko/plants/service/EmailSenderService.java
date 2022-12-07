package com.viko.plants.service;

import com.viko.plants.entity.Order;

import javax.mail.MessagingException;

public interface EmailSenderService {
    void sendSimpleEmail(String toEmail, String body, String subject);
    void SendEmailWithAttachment(String toEmail, String body, String subject, String attachment) throws MessagingException;
    void sendInformationToUser(Order order, String status);

}
