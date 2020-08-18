package com.example.posty.controller;
import com.example.posty.model.Event;
import com.example.posty.model.Message;
import com.example.posty.model.Person;
import com.example.posty.repository.EventRepository;
import com.example.posty.repository.OfficerRepository;
import com.example.posty.repository.PersonRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders="*")
public class MessageController {

    private final EventRepository eventRepository;
    private final PersonRepository personRepository;
    private final OfficerRepository officerRepository;

    public MessageController(EventRepository eventRepository, PersonRepository personRepository, OfficerRepository officerRepository) {
        this.eventRepository = eventRepository;
        this.personRepository = personRepository;
        this.officerRepository = officerRepository;
    }

    //notify the specific officer who owns the event
    @MessageMapping("/applyToOfficer/{mid}/{eid}/{pid}")
    @SendTo("/topic/officer/{mid}")
    public Message apply( @DestinationVariable Long eid, @DestinationVariable Long pid) throws Exception{
        Event event = eventRepository.findById(eid).orElseThrow(Exception::new);
        Person person = personRepository.findById(pid).orElseThrow(Exception::new);
        return new Message( "New Applicant! " + person.getName() + " " + person.getSurname() +  "  has applied for " + event.getTitle());
    }

    //notify all non-officers that a new event has been made
    @MessageMapping("/announceEventCreation")
    @SendTo("/topic/newEventAnnouncements")
    public Message notify( Event event ) throws Exception{
        return new Message( "New Event! " + event.getMaker().getName() + " " + event.getMaker().getSurname() +  "  has created " + event.getTitle() );
    }
}
