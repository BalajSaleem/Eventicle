package com.example.posty.controller;

import com.example.posty.exception.ResourceNotFoundException;
import com.example.posty.model.Event;
import com.example.posty.model.Officer;
import com.example.posty.repository.OfficerRepository;
import com.sun.istack.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class OfficerController {

    private final OfficerRepository officerRepository;

    public OfficerController(OfficerRepository officerRepository) {
        this.officerRepository = officerRepository;
    }

    @GetMapping("officers")
    public List<Officer> getPersons(){
        return officerRepository.findAll();
    }

    //the events that the officer has made
    @GetMapping("/officerEvents/{id}")
    public List<Event> getPersonEvents(@PathVariable(value = "id") Long personId)  throws ResourceNotFoundException{
        Officer person = officerRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("officer " + personId + " not found") );
        return person.getEventsMade();
    }


    //getPersonById
    @GetMapping("/officers/{id}")
    public ResponseEntity<Officer> getPersonById(@PathVariable(value = "id") Long personId)
            throws ResourceNotFoundException {
        Officer person = officerRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("officer " + personId + " not found") );
        return ResponseEntity.ok().body(person);
    }
    //savePerson
    @PostMapping("officers")
    public Officer createPerson(@RequestBody Officer person){
        return  this.officerRepository.save(person);
    }

    //updatePerson
    @PutMapping("officers/{id}")
    public ResponseEntity<Officer> updatePerson(@PathVariable(value = "id") Long personId, @NotNull @RequestBody
            Officer personDetails) throws ResourceNotFoundException{
        Officer person = officerRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("officer  " + personId + " not found") );

        person.setEmail(personDetails.getEmail());
        person.setName(personDetails.getName());
        person.setSurname(personDetails.getSurname());
        person.setCorporation(personDetails.getCorporation());

        return ResponseEntity.ok(this.officerRepository.save(person));
    }

    //deletePerson
    @DeleteMapping("officers/{id}")
    public Map<String,Boolean> deletePerson(@PathVariable(value = "id") Long personId)
            throws ResourceNotFoundException{
        Officer person = officerRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("officer " + personId + " not found") );
        this.officerRepository.delete(person);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }




}
