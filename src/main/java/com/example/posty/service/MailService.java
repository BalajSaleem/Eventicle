package com.example.posty.service;

import com.example.posty.model.Event;
import com.example.posty.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

@Service
public class MailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendmail(Event event, Person person) throws IOException, MessagingException {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(person.getEmail());
        message.setSubject("Registered for " + event.getTitle());
        message.setText( "Congratulations! you have successfully signed up for " + event.getTitle() +
                " we are looking forward to seeing you at the event on " + event.getStartDate() +
               "\n here is how the event maker described the event: " + event.getDescription()
                + "\n. We wish you a pleasant experience at the event. \n \n Sincerely, \n Folks at Eventicle"  );
        emailSender.send(message);
    }
}
