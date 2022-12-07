package com.viko.plants.service;

import com.viko.plants.entity.GiftCard;
import com.viko.plants.repository.GiftCardRepository;
import com.viko.plants.request.GiftCardRequest;
import org.aspectj.lang.annotation.AfterReturning;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.UUID;

@Service
public class GiftCardServiceImpl implements GiftCardService {

    private GiftCardRepository giftCardRepository;
    private EmailSenderService emailSenderService;

    public GiftCardServiceImpl(GiftCardRepository giftCardRepository, EmailSenderService emailSenderService) {
        this.giftCardRepository = giftCardRepository;
        this.emailSenderService = emailSenderService;
    }

    @Override
    @Transactional
    @Async
    public ResponseEntity<String> postGiftCard(GiftCardRequest request) throws MessagingException {

        String giftCardNumber = generateGiftCardNumber();
        GiftCard giftCard = new GiftCard();

        giftCard.setCode(giftCardNumber);
        giftCard.setSum(request.getSum());
        giftCard.setRemainingBalance(request.getSum());
        giftCard.setUsedBalance(0.0f);

        giftCardRepository.save(giftCard);
        sendGiftCardEmail(request, giftCardNumber);

        return new ResponseEntity<>("Dovanų kupono užsakymas pateiktas!", HttpStatus.CREATED);
    }

    private void sendGiftCardEmail(GiftCardRequest request, String giftCardNumber) throws MessagingException {
        emailSenderService.SendEmailWithAttachment(
                request.getEmail(),
                "Sveiki, " + request.getName() + "!\nJums yra dovanojamas dovanų kuponas!\n\nŽinutė nuo dovanos teikėjo:\n" + request.getMessage()
                        + "\n\n Dovanų kupono kodas: " + giftCardNumber,
                request.getSum().intValue() + "€ Dovanų kuponas iš Augalų oazės",
                "src/main/resources/Images/GiftCards/" + request.getSum().intValue() + "/" + request.getPicture() + ".jpg");
    }

    private String generateGiftCardNumber() {

        return UUID.randomUUID().toString();
    }

    @Override
    @Transactional
    public GiftCard checkIfCodeValid(String code) {

        GiftCard giftCard = giftCardRepository.findByCode(code);
        System.out.println(giftCard);

        return giftCard;
    }

    @Override
    @Transactional
    public ResponseEntity<String> updateGiftCard(GiftCard giftCard) {
        giftCardRepository.save(giftCard);
        return new ResponseEntity<>("Dovanų kupono informacija atnaujinta", HttpStatus.OK);
    }
}
