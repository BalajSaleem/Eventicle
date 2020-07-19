package com.example.posty.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

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
    private LocalDate createDate;
    private LocalDate startDate;
    private LocalDate endDate;

    //Location Related
    private Integer latitude;
    private Integer longitude;
    private String address;

    @ManyToOne
    @JoinColumn(name = "person_id")
    @JsonBackReference
    private Person maker;

    //Boilerplate code

    public Event() {
    }

    public Event(String title, String description, Integer quota, LocalDate createDate, LocalDate startDate, LocalDate endDate,
                 Integer latitude, Integer longitude, String address){
        this.title = title;
        this.description = description;
        this.quota = quota;
        this.createDate = createDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public Person getMaker() {
        return maker;
    }

    public void setMaker(Person maker) {
        this.maker = maker;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getLatitude() {
        return latitude;
    }

    public void setLatitude(Integer latitude) {
        this.latitude = latitude;
    }

    public Integer getLongitude() {
        return longitude;
    }

    public void setLongitude(Integer longitude) {
        this.longitude = longitude;
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

}
