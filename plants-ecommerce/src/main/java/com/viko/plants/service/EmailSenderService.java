package com.viko.plants.service;

import javax.mail.MessagingException;

public interface EmailSenderService {
    void sendSimpleEmail(String toEmail, String body, String subject);
    void SendEmailWithAttachment(String toEmail, String body, String subject, String attachment) throws MessagingException;
}
