package com.example.posty.controller;

import com.example.posty.exception.ResourceNotFoundException;
import com.example.posty.model.Event;
import com.example.posty.model.Person;
import com.example.posty.repository.PersonRepository;
import com.sun.istack.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class PersonController {

    private final PersonRepository personRepository;

    public PersonController(PersonRepository eventRepository) {
        this.personRepository = eventRepository;
    }

    @GetMapping("persons")
    public List<Person> getPersons(){
        return personRepository.findAll();
    }

    //get the events person in participating in
    @GetMapping("/personEvents/{id}")
    public List<Event> getPersonEvents(@PathVariable(value = "id") Long personId)  throws ResourceNotFoundException{
        Person person = personRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("person " + personId + " not found") );
        return person.getEvents();
    }

    //getPersonById
    @GetMapping("/persons/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable(value = "id") Long personId)
            throws ResourceNotFoundException {
        Person person = personRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("person " + personId + " not found") );
        return ResponseEntity.ok().body(person);
    }

    //savePerson
    @PostMapping("persons")
    public Person createPerson(@RequestBody Person person){
        return  this.personRepository.save(person);
    }

    //updatePerson
    @PutMapping("persons/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable(value = "id") Long personId, @NotNull @RequestBody
            Person personDetails) throws ResourceNotFoundException{
        Person person = personRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("person  " + personId + " not found") );

        person.setEmail(personDetails.getEmail());
        person.setName(personDetails.getName());
        person.setSurname(personDetails.getSurname());
        return ResponseEntity.ok(this.personRepository.save(person));
    }


    //deletePerson
    @DeleteMapping("persons/{id}")
    public Map<String,Boolean> deletePerson(@PathVariable(value = "id") Long personId)
            throws ResourceNotFoundException{
        Person person = personRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("person " + personId + " not found") );
        this.personRepository.delete(person);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }




}
