package com.example.posty.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;
    private String answer;


    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person asker;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;


    public Question() {
    }


    public Question(String question, String answer, Person asker, Event event) {
        this.question = question;
        this.answer = answer;
        this.asker = asker;
        this.event = event;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }


    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Person getAsker() {
        return asker;
    }

    public void setAsker(Person asker) {
        this.asker = asker;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return id.equals(question.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
