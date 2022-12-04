package com.viko.plants.service;

import com.viko.plants.entity.GiftCard;
import com.viko.plants.repository.GiftCardRepository;
import com.viko.plants.request.GiftCardRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> postGiftCard(GiftCardRequest request) throws MessagingException {

        GiftCard giftCard = new GiftCard();

        String giftCardNumber = generateGiftCardNumber();
        giftCard.setCode(giftCardNumber);
        giftCard.setSum(request.getSum());
        giftCard.setRemainingBalance(request.getSum());
        giftCard.setUsedBalance(0.0f);

        giftCardRepository.save(giftCard);

        emailSenderService.SendEmailWithAttachment(
                request.getEmail(),
                "Sveiki, " + request.getName() + "!\nJums yra dovanojamas dovanų kuponas!\n\nŽinutė nuo dovanos teikėjo:\n" + request.getMessage()
                + "\n\n Dovanų kupono kodas: " + giftCardNumber,
                request.getSum().intValue() + "€ Dovanų kuponas iš Augalų oazės",
                "src/main/resources/Images/GiftCards/"+request.getSum().intValue()+"/"+request.getPicture()+".jpg");

        return new ResponseEntity<>("Dovanų kupono užsakymas pateiktas!", HttpStatus.CREATED);
    }

    private String generateGiftCardNumber() {

        return UUID.randomUUID().toString();
    }
}
