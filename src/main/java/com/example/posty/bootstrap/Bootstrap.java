package com.example.posty.bootstrap;

import com.example.posty.model.Event;
import com.example.posty.model.Person;
import com.example.posty.repository.PersonRepository;
import com.example.posty.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;

@Component
public class Bootstrap implements CommandLineRunner {

    private final EventRepository eventRepository;
    private final PersonRepository personRepository;


    public Bootstrap(EventRepository eventRepository, PersonRepository personRepository) {
        this.eventRepository = eventRepository;
        this.personRepository = personRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Loading Data...");

        Person guru = new Person();
        guru.setName("Johny");
        guru.setSurname("Thompson");
        guru.setCorporation("SFG");
        guru.setEmail("guru@guru.com");
        personRepository.save(guru);

        Person emre = new Person();
        emre.setName("Emre");
        emre.setSurname("Ahmet");
        emre.setCorporation("Tubitak");
        emre.setEmail("ahmet@ahmet.com");
        personRepository.save(emre);

        Person noor = new Person();
        noor.setName("Noor");
        noor.setSurname("Naseem");
        noor.setCorporation("FAST");
        noor.setEmail("noor@noor.com");
        personRepository.save(noor);

        Person ahmed = new Person();
        ahmed.setName("Ahmed");
        ahmed.setSurname("Erkaya");
        ahmed.setCorporation("Tubitak");
        ahmed.setEmail("ahmed@ahmed.com");
        personRepository.save(ahmed);


        Event sprEvent = new Event();
        sprEvent.setTitle("Spring Learning!");
        sprEvent.setDescription("Learn as much about spring as you want to");
        sprEvent.setCreateDate(LocalDate.now());
        sprEvent.setStartDate(LocalDate.of(2020,9, 1));
        sprEvent.setEndDate(LocalDate.of(2020,9, 3));
        sprEvent.setLatitude(10);
        sprEvent.setLongitude(20);
        sprEvent.setAddress("Avenue Boulevard, California, America");
        sprEvent.setQuota(100);
        sprEvent.setMaker(guru);
        guru.getEvents().add(sprEvent);
        eventRepository.save(sprEvent);

        Event thymEvent = new Event();
        thymEvent.setTitle("Thymleaf!");
        thymEvent.setDescription("Learn about UI with thymeleaf");
        thymEvent.setCreateDate(LocalDate.now());
        thymEvent.setStartDate(LocalDate.of(2020,10,10));
        thymEvent.setEndDate(LocalDate.of(2020,10, 12));
        thymEvent.setLatitude(10);
        thymEvent.setLongitude(20);
        thymEvent.setAddress("Avenue Boulevard, California, America");
        thymEvent.setQuota(50);
        thymEvent.setMaker(guru);
        guru.getEvents().add(sprEvent);
        eventRepository.save(thymEvent);


        Event reactEvent = new Event();
        reactEvent.setTitle("React Crash Course");
        reactEvent.setDescription("Whole lotta react");
        reactEvent.setCreateDate(LocalDate.now());
        reactEvent.setStartDate(LocalDate.of(2020,8, 1));
        reactEvent.setEndDate(LocalDate.of(2020,8, 12));
        reactEvent.setLatitude(33);
        reactEvent.setLongitude(80);
        reactEvent.setAddress("Avenue Boulevard, California, America");
        reactEvent.setQuota(100);
        reactEvent.setMaker(emre);
        guru.getEvents().add(reactEvent);
        eventRepository.save(reactEvent);

        System.out.println("Initial Data Loaded!");
    }
}
