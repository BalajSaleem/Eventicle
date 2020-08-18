package com.example.posty.repository;

import com.example.posty.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    public Optional<Person> findByEmail(final String email);
}
