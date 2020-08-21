package com.example.posty.bootstrap;

import com.example.posty.model.Event;
import com.example.posty.model.Officer;
import com.example.posty.model.Person;
import com.example.posty.model.Question;
import com.example.posty.repository.OfficerRepository;
import com.example.posty.repository.PersonRepository;
import com.example.posty.repository.EventRepository;
import com.example.posty.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class Bootstrap implements CommandLineRunner {

    private final EventRepository eventRepository;
    private final PersonRepository personRepository;
    private final OfficerRepository officerRepository;
    private final QuestionRepository questionRepository;


    public Bootstrap(EventRepository eventRepository, PersonRepository personRepository, OfficerRepository officerRepository, QuestionRepository questionRepository) {
        this.eventRepository = eventRepository;
        this.personRepository = personRepository;
        this.officerRepository = officerRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Loading Data...");

        Officer guru = new Officer();
        guru.setName("Johny");
        guru.setSurname("Thompson");
        guru.setCorporation("SFG");
        guru.setEmail("guru@guru.com");
        guru.setNationalId("99999567891");
        guru.setPassword("qwer1234");
        officerRepository.save(guru);

        Event sprEvent = new Event();
        sprEvent.setTitle("Spring Learning!");
        sprEvent.setDescription("Learn as much about spring as you want to");
        sprEvent.setCreateDate(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        sprEvent.setStartDate(LocalDate.of(2020,9, 1).format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        sprEvent.setEndDate(LocalDate.of(2020,9, 3).format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        sprEvent.setLat(39.907467);
        sprEvent.setLng(32.802582);
        sprEvent.setAddress("Avenue Boulevard, California, America");
        sprEvent.setQuota(100);
        sprEvent.setMaker(guru);
        guru.getEventsMade().add(sprEvent);
        eventRepository.save(sprEvent);

        Event thymEvent = new Event();
        thymEvent.setTitle("Thymleaf!");
        thymEvent.setDescription("Learn about UI with thymeleaf");
        thymEvent.setCreateDate(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        thymEvent.setStartDate(LocalDate.of(2020,10,10).format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        thymEvent.setEndDate(LocalDate.of(2020,10, 12).format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        thymEvent.setLat(39.907467);
        thymEvent.setLng(32.802582);
        thymEvent.setAddress("Avenue Boulevard, California, America");
        thymEvent.setQuota(50);
        thymEvent.setMaker(guru);
        guru.getEventsMade().add(sprEvent);
        eventRepository.save(thymEvent);

        officerRepository.save(guru);


        Officer emre = new Officer();
        emre.setName("Emre");
        emre.setSurname("Ahmet");
        emre.setCorporation("Tubitak");
        emre.setEmail("ahmet@ahmet.com");
        emre.setNationalId("88994567891");
        emre.setPassword("qwer1234");
        officerRepository.save(emre);

        Event reactEvent = new Event();
        reactEvent.setDescription("Whole lotta react");
        reactEvent.setTitle("React Crash Course");
        reactEvent.setCreateDate(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        reactEvent.setStartDate(LocalDate.of(2020,2, 1).format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        reactEvent.setEndDate(LocalDate.of(2020,2, 12).format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        reactEvent.setLat(39.907467);
        reactEvent.setAddress("Avenue Boulevard, California, America");
        reactEvent.setLng(32.802582);
        reactEvent.setQuota(100);
        reactEvent.setMaker(emre);
        eventRepository.save(reactEvent);

        officerRepository.save(emre);


        Officer noor = new Officer();
        noor.setName("Noor");
        noor.setSurname("Naseem");
        noor.setCorporation("FAST");
        noor.setEmail("noor@noor.com");
        noor.setNationalId("6849567891");
        noor.setPassword("qwer1234");
        officerRepository.save(noor);


        Question sprQ = new Question();
        sprQ.setQuestion("Why use spring?");


        //goes to spring and thym event
        Person ahmed = new Person();
        ahmed.setName("Ahmed");
        ahmed.setSurname("Erkaya");
        ahmed.setEmail("ahmed@ahmed.com");
        ahmed.setNationalId("01234567891");
        ahmed.setPassword("qwer1234");
        sprQ.setAsker(ahmed);
        ahmed.getQuestions().add(sprQ);
        personRepository.save(ahmed);
        ahmed.getEvents().add(sprEvent);
        ahmed.getEvents().add(thymEvent);
        personRepository.save(ahmed);

        //add ahmed to those events
        sprEvent.getQuestions().add(sprQ);
        sprQ.setEvent(sprEvent);
        sprEvent.getParticipants().add(ahmed);
        thymEvent.getParticipants().add(ahmed);

        eventRepository.save(sprEvent);
        eventRepository.save(thymEvent);
        questionRepository.save(sprQ);


        Question reactQ = new Question();
        reactQ.setQuestion("Components vs classes");
        //goes to the react event
        Person balaj = new Person();
        balaj.setName("Balaj");
        balaj.setSurname("Saleem");
        balaj.setEmail("balaj@balaj.com");
        balaj.setNationalId("01234569999");
        balaj.setPassword("qwer1234");
        balaj.getQuestions().add(reactQ);
        reactQ.setAsker(balaj);
        personRepository.save(balaj);
        balaj.getEvents().add(reactEvent);
        personRepository.save(balaj);

        //add balaj to react event
        reactEvent.getParticipants().add(balaj);

        guru.getEvents().add(reactEvent);
        reactEvent.getParticipants().add(guru);
        eventRepository.save(reactEvent);
        personRepository.save(guru);

        reactQ.setEvent(reactEvent);
        reactEvent.getQuestions().add(reactQ);

        eventRepository.save(reactEvent);
        questionRepository.save(reactQ);
//
//        Question springQ = new Question("What time?", "", ahmed, sprEvent);
//        sprEvent.getQuestions().add(springQ);
//        ahmed.getQuestions().add(springQ);
//        questionRepository.save(springQ);
//        eventRepository.save(sprEvent);
//        personRepository.save(ahmed);
//
//        Question thymeQ = new Question("What syllabus?", "", ahmed, thymEvent);
//        thymEvent.getQuestions().add(thymeQ);
//        ahmed.getQuestions().add(thymeQ);
//        questionRepository.save(thymeQ);
//        eventRepository.save(thymEvent);
//        personRepository.save(ahmed);



        System.out.println("Initial Data Loaded!");
    }
}
