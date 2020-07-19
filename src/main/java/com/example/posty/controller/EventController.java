package com.example.posty.controller;

import com.example.posty.exception.ResourceNotFoundException;
import com.example.posty.model.Event;
import com.example.posty.repository.EventRepository;
import com.sun.istack.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping("events")
    public List<Event> getEvents(){
        return eventRepository.findAll();
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
    //updateEvent
    @PutMapping("events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable(value = "id") Long eventId, @NotNull @RequestBody Event eventDetails)
            throws ResourceNotFoundException{
        Event event = eventRepository.findById(eventId).orElseThrow( () -> new ResourceNotFoundException("event " + eventId + " not found") );

        event.setDescription(eventDetails.getDescription());
        //event.setMaker(eventDetails.getMaker());
        event.setTitle(eventDetails.getTitle());

        return ResponseEntity.ok(this.eventRepository.save(event));
    }

    //deleteEvent
    @DeleteMapping("events/{id}")
    public Map<String,Boolean> deleteEvent(@PathVariable(value = "id") Long eventId) throws ResourceNotFoundException{
        Event event = eventRepository.findById(eventId).orElseThrow( () -> new ResourceNotFoundException("event " + eventId + " not found") );
        this.eventRepository.delete(event);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }


}
