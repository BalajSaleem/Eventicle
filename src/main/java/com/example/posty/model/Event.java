package com.example.posty.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //Event Related
    private Long id;
    private String title;
    private String description;
    private Integer quota;

    //Date Related
    private String createDate;
    private String startDate;
    private String endDate;

    //Location Related
    private Double lat;
    private Double lng;
    private String address;

    //event belonging to the officer
    @ManyToOne
    @JoinColumn(name = "officer_id")
    private Officer maker;

    //participants on this event
    @ManyToMany(cascade = CascadeType.REMOVE, mappedBy = "events")
    private List<Person> participants = new ArrayList<>();

    //Boilerplate code : should have used lombok



    public Event() {
    }


    public Event(String title, String description, Integer quota, String createDate, String startDate, String endDate,
                 Double latitude, Double longitude, String address){
        this.title = title;
        this.description = description;
        this.quota = quota;
        this.createDate = createDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.lat = latitude;
        this.lng = longitude;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Officer getMaker() {
        return maker;
    }

    public void setMaker(Officer maker) {
        this.maker = maker;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double latitude) {
        this.lat = latitude;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double longitude) {
        this.lng = longitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getQuota() {
        return quota;
    }

    public void setQuota(Integer quota) {
        this.quota = quota;
    }

    public List<Person> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Person> participants) {
        this.participants = participants;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
