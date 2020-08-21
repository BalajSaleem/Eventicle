package com.example.posty.controller;

import com.example.posty.exception.ResourceNotFoundException;
import com.example.posty.model.Event;
import com.example.posty.model.Officer;
import com.example.posty.model.Person;
import com.example.posty.model.Question;
import com.example.posty.repository.EventRepository;
import com.example.posty.repository.OfficerRepository;
import com.example.posty.repository.PersonRepository;
import com.example.posty.repository.QuestionRepository;
import com.sun.istack.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders="*")
@RequestMapping("/api/v1/")
public class QuestionController {

    private final QuestionRepository questionRepository;
    private final EventRepository eventRepository;
    private final PersonRepository personRepository;
    private final OfficerRepository officerRepository;

    public QuestionController(QuestionRepository questionRepository, EventRepository eventRepository, PersonRepository personRepository, OfficerRepository officerRepository) {
        this.questionRepository = questionRepository;
        this.eventRepository = eventRepository;
        this.personRepository = personRepository;
        this.officerRepository = officerRepository;
    }

    @GetMapping("questions")
    public List<Question> getQuestions(){
        return questionRepository.findAll();
    }

    @GetMapping("questions/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable(value = "id") Long questionId) throws ResourceNotFoundException {
        Question question = questionRepository.findById(questionId).orElseThrow(
                () -> new ResourceNotFoundException("question  " + questionId + " not found") );
        return ResponseEntity.ok().body(question);
    }

    @GetMapping("questionsForEvent/{id}")
    public List<Question> getQuestionsForEvent(@PathVariable(value = "id") Long eventId) throws ResourceNotFoundException {
        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("event  " + eventId + " not found") );
        return event.getQuestions();
    }

    @GetMapping("questionsByPerson/{id}")
    public List<Question> getQuestionsByPerson(@PathVariable(value = "id") Long personId) throws ResourceNotFoundException {
        Person person = personRepository.findById(personId).orElseThrow(
                () -> new ResourceNotFoundException("event  " + personId + " not found") );
        return person.getQuestions();
    }

    @PostMapping("questions")
    public Question createQuestion(@RequestBody Question question){
        return  this.questionRepository.save(question);
    }

    //save question asked by a person, for an event
    @PostMapping("askQuestion/{eid}/{pid}")
    public ResponseEntity<Question> askQuestionForEvent(@PathVariable(value = "pid") Long personId,
                                                     @PathVariable(value = "eid") Long eventId,
                                                     @NotNull @RequestBody String questionContent)
            throws ResourceNotFoundException {
        Person person = personRepository.findById(personId).orElseThrow(() ->
                new ResourceNotFoundException("person " + personId + " not found"));
        Event event = eventRepository.findById(eventId).orElseThrow(() ->
                new ResourceNotFoundException("event " + eventId + " not found"));

        if(!event.getParticipants().contains(person)){
            throw new ResourceNotFoundException("person " + person.getName() + " does not participate in " + event.getTitle());
        }

        Question question = new Question(questionContent, null, person, event);
        person.getQuestions().add(question);
        event.getQuestions().add(question);

        return ResponseEntity.ok(this.questionRepository.save(question));
    }
    @PutMapping("answerQuestion/{qid}/{oid}")
    public ResponseEntity<Question> answerQuestion(@PathVariable(value = "qid") Long questionId, @PathVariable(value = "oid") Long officerId,@NotNull @RequestBody String questionAnswer)
            throws ResourceNotFoundException{
        Question question = questionRepository.findById(questionId).orElseThrow( () ->
                new ResourceNotFoundException("question " + questionId + " not found") );
        Officer officer = officerRepository.findById(officerId).orElseThrow( () ->
                new ResourceNotFoundException("officer " + officerId + " not found") );

        if(!question.getEvent().getMaker().equals(officer)){
            throw new ResourceNotFoundException("officer " + officer.getName() + " is not authorized to answer this question");
        }

        question.setAnswer(questionAnswer);
        return ResponseEntity.ok(questionRepository.save(question));
    }

    @DeleteMapping("questions/{id}")
    public Map<String,Boolean> deleteQuestion(@PathVariable(value = "id") Long questionId) throws ResourceNotFoundException{
        Question question = questionRepository.findById(questionId).orElseThrow( () ->
                new ResourceNotFoundException("question " + questionId + " not found") );
        question.getAsker().getQuestions().remove(question);
        question.getEvent().getQuestions().remove(question);
        questionRepository.save(question);
        this.questionRepository.delete(question);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
