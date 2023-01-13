package com.viko.plants.service;

import com.viko.plants.entity.Order;
import com.viko.plants.entity.User;
import com.viko.plants.request.GiftCardRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;


    private void sendSimpleEmail(String toEmail, String body, String subject) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("augalu.oazes.pasaulis@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        mailSender.send(message);
    }


    private void SendEmailWithAttachment(String toEmail, String body, String subject, String attachment) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom("augalu.oazes.pasaulis@gmail.com");
        mimeMessageHelper.setTo(toEmail);
        mimeMessageHelper.setText(body);
        mimeMessageHelper.setSubject(subject);

        FileSystemResource fileSystem = new FileSystemResource(new File(attachment));

        mimeMessageHelper.addAttachment(fileSystem.getFilename(), fileSystem);

        mailSender.send(mimeMessage);
    }

    @Async
    @Override
    public void sendOrderConfirmationEmail(Order order, User user) {
        sendSimpleEmail(user.getEmail(), "Sveiki, " + user.getFirstname() + " Jūsų užsakymas buvo sėkmingai pateiktas \n\n" +
                        "Detalesnę informaciją galite rasti mūsų internetinės parduotuvės svetainėje.",
                "Jūsų užsakymas #" + order.getId() + " pateiktas!");
    }

    @Async
    @Override
    public void sendOrderStatusInformationToUser(Order order, String status) {
        sendSimpleEmail(order.getUser().getEmail(),
                "Sveiki " + order.getUser().getFirstname() + ", jūsų užsakymo #" + order.getId() + " būsena buvo pakeista į " + status + "\n\n" +
                        "Detalesnę užsakymo informacija rasite prisijungę prie mūsų internetinės parduotuvės",
                "Augalų oazės #" + order.getId() + " užsakymo būsena pakeista į " + ",," + status + "''");
    }

    @Async
    @Override
    public void sendGiftCardEmail(GiftCardRequest request, String giftCardNumber) throws MessagingException {
        SendEmailWithAttachment(
                request.getEmail(),
                "Sveiki, " + request.getName() + "!\nJums yra dovanojamas dovanų kuponas!\n\nŽinutė nuo dovanos teikėjo:\n" + request.getMessage()
                        + "\n\n Dovanų kupono kodas: " + giftCardNumber,
                request.getSum().intValue() + "€ Dovanų kuponas iš Augalų oazės",
                "src/main/resources/Images/GiftCards/" + request.getSum().intValue() + "/" + request.getPicture() + ".jpg");
    }
}
