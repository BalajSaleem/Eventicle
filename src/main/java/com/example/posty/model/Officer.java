package com.example.posty.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "officers")
public class Officer extends Person{

    private String corporation;

    //events he has made
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "maker")
    @JsonIgnore
    private List<Event> eventsMade = new ArrayList<>();

    public Officer() {
    }

    public Officer(String name, String surname, String email, String password, String nationalId, String corporation) {
        super(name, surname, password, email, nationalId);
        this.corporation = corporation;

    }

    public String getCorporation() {
        return corporation;
    }

    public void setCorporation(String corporation) {
        this.corporation = corporation;
    }

    public List<Event> getEventsMade() {
        return eventsMade;
    }

    public void setEventsMade(List<Event> eventsMade) {
        this.eventsMade = eventsMade;
    }

}
