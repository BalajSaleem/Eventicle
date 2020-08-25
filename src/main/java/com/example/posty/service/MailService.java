package com.example.posty.service;

import com.example.posty.model.Event;
import com.example.posty.model.Person;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.mail.*;
import javax.mail.internet.MimeMessage;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class MailService {

    private final JavaMailSender emailSender;
    private final QrService qrService;

    public MailService(JavaMailSender emailSender, QrService qrService) {
        this.emailSender = emailSender;
        this.qrService = qrService;
    }

    public void sendmail(Event event, Person person) throws Exception {

        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(person.getEmail());
        helper.setSubject("Registered for " + event.getTitle());
        helper.setText( "Dear Mr / Ms "  + person.getSurname() + "\n \nCongratulations! you have successfully signed up for " + event.getTitle() +
                " we are looking forward to seeing you at the event on " + event.getStartDate() +
               "\nHere is how the event maker described the event: " + event.getDescription() +
                "\nKindly find the QR Code for your registration for this event attached along this email, you may be required to present this on entry"
                + "\nWe wish you a pleasant experience at the event. \n \nSincerely, \nFolks at Eventicle"  );


        BufferedImage qrCode = qrService.generateQRCodeImage(
                person.getName() + " " + person.getSurname() + " of ID " + person.getId() + " is registered for: \n " + event.getTitle() + " \n ID: "  + event.getId() + "\n from: " + event.getStartDate() + " \n till:  " + event.getEndDate() + " \n at: " + event.getAddress()
        );

        File qrFile = new File("QrCode.jpg");
        ImageIO.write(qrCode, "jpg", qrFile);

        helper.addAttachment("QrCode.jpg", qrFile);


        emailSender.send(message);
    }
}
