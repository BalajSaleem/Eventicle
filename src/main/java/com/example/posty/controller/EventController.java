package com.example.posty.controller;

import com.example.posty.service.MailService;
import com.example.posty.exception.ResourceNotFoundException;
import com.example.posty.model.Event;
import com.example.posty.model.Officer;
import com.example.posty.model.Person;
import com.example.posty.repository.EventRepository;
import com.example.posty.repository.OfficerRepository;
import com.example.posty.repository.PersonRepository;
import com.sun.istack.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders="*")
@RequestMapping("/api/v1/")
public class EventController {

    private final EventRepository eventRepository;
    private final PersonRepository personRepository;
    private final OfficerRepository officerRepository;
    private final DateTimeFormatter formatter;
    private final MailService mailService;

    public EventController(EventRepository eventRepository, PersonRepository personRepository, OfficerRepository officerRepository, MailService mailService) {
        this.eventRepository = eventRepository;
        this.personRepository = personRepository;
         this.officerRepository = officerRepository;
        this.mailService = mailService;
        formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    }

    //get all events
    @GetMapping("events")
    public List<Event> getEvents(){
        return eventRepository.findAll();
    }

    //get the remaining events after todays date
    @GetMapping("eventsRemaining")
    public List<Event> getRemainingEvents(){
        return eventRepository.findAll().stream()
                .filter( x -> LocalDate.parse(x.getStartDate(), formatter ).compareTo(LocalDate.now()) >= 0)
                .collect(Collectors.toList());
    }

    @GetMapping("eventsNotRegistered/{pid}")
    public List<Event> getUnregisteredEvents(@PathVariable(value = "pid") Long personId) throws ResourceNotFoundException{
        Person person = personRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("person  " + personId + " not found") );
        return eventRepository.findAll().stream()
                .filter( x -> !person.getEvents().contains(x))
                .collect(Collectors.toList());
    }

    @GetMapping("eventsNotRegisteredRemaining/{pid}")
    public List<Event> getUnregisteredRemainingEvents(@PathVariable(value = "pid") Long personId) throws ResourceNotFoundException{
        Person person = personRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("person  " + personId + " not found") );
        return eventRepository.findAll().stream()
                .filter( x -> !person.getEvents().contains(x)
                        && LocalDate.parse(x.getStartDate(), formatter ).compareTo(LocalDate.now()) >= 0
                        && x.getQuota() >= 0)
                .collect(Collectors.toList());
    }

    //getEventById
    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable(value = "id") Long eventId) throws ResourceNotFoundException {
        Event event = eventRepository.findById(eventId).orElseThrow( () -> new ResourceNotFoundException("event " + eventId + " not found") );
        return ResponseEntity.ok().body(event);
    }
    //saveEvent
    @PostMapping("events")
    public Event createEvent(@RequestBody Event event){
        return  this.eventRepository.save(event);
    }

    //save event under an officer
    @PostMapping("events/{id}")
    public ResponseEntity<Event> createEventWithMaker(@PathVariable(value = "id") Long personId, @NotNull @RequestBody Event eventDetails)
            throws ResourceNotFoundException {
        Officer officer = officerRepository.findById(personId).orElseThrow(() ->
                new ResourceNotFoundException("officer " + personId + " not found"));
        eventDetails.setMaker(officer);
        eventRepository.save(eventDetails);
        officer.getEventsMade().add(eventDetails);
        officerRepository.save(officer);
        return ResponseEntity.ok(this.eventRepository.save(eventDetails));
    }

        //updateEvent
    @PutMapping("events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable(value = "id") Long eventId, @NotNull @RequestBody Event eventDetails)
            throws ResourceNotFoundException{
        Event event = eventRepository.findById(eventId).orElseThrow( () -> new ResourceNotFoundException("event " + eventId + " not found") );

        event.setDescription(eventDetails.getDescription());
        event.setTitle(eventDetails.getTitle());
        event.setAddress(eventDetails.getAddress());
        event.setStartDate(eventDetails.getStartDate());
        event.setEndDate(eventDetails.getEndDate());
        event.setQuota(eventDetails.getQuota());
        return ResponseEntity.ok(this.eventRepository.save(event));
    }



    //addEventForPerson
    @PutMapping("eventAddPerson/{id}/{pid}")
    public ResponseEntity<Event> addEventPerson(@PathVariable(value = "id") Long eventId, @PathVariable(value = "pid") Long personId) throws ResourceNotFoundException, IOException, MessagingException {

            Event event = eventRepository.findById(eventId).orElseThrow(
                    () -> new ResourceNotFoundException("event  " + eventId + " not found") );
            Person person = personRepository.findById(personId).orElseThrow(
                    () -> new ResourceNotFoundException("person  " + personId + " not found") );

            if(person.equals(event.getMaker()))
                throw new ResourceNotFoundException("cant add participant: person  " + personId + " is the maker of event " + eventId);
            if(person.getEvents().contains(event))
                throw new ResourceNotFoundException("cant add participant: person  " + personId + " is the already member event " + eventId);
            if(event.getQuota() <= 0)
                throw new ResourceNotFoundException("cant add participant: person  " + personId + " event " + eventId + "is has no remaining quota");

//        try{
            event.getParticipants().add(person);
            person.getEvents().add(event);

            //reduce qouta
            event.setQuota(event.getQuota() - 1);
            personRepository.save(person);
            return ResponseEntity.ok(this.eventRepository.save(event));
//        }
//        finally {
//            mailService.sendmail(event, person);
//        }
    }

    //addEventForPerson
    @PutMapping("sendPersonEmail/{id}/{pid}")
    public Map<String,Boolean> sendPersonEmail(@PathVariable(value = "id") Long eventId, @PathVariable(value = "pid") Long personId) throws Exception {

        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("event  " + eventId + " not found") );
        Person person = personRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("person  " + personId + " not found") );

        mailService.sendmail(event, person);
        Map<String, Boolean> response = new HashMap<>();
        response.put("email", Boolean.TRUE);
        return response;
    }

    //removeEventForPerson
    @PutMapping("eventRemovePerson/{id}/{pid}")
    public ResponseEntity<Event> removeEventPerson(@PathVariable(value = "id") Long eventId, @PathVariable(value = "pid") Long personId) throws ResourceNotFoundException{
        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("event  " + eventId + " not found") );
        Person person = personRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("person  " + personId + " not found") );
        event.getParticipants().remove(person);
        person.getEvents().remove(event);
        personRepository.save(person);
        return ResponseEntity.ok(this.eventRepository.save(event));
    }


    //deleteEvent
    @DeleteMapping("events/{id}")
    public Map<String,Boolean> deleteEvent(@PathVariable(value = "id") Long eventId) throws ResourceNotFoundException{
        Event event = eventRepository.findById(eventId).orElseThrow( () -> new ResourceNotFoundException("event " + eventId + " not found") );
        event.clearParticipants();
        eventRepository.save(event);
        this.eventRepository.delete(event);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }


}
