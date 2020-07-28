package com.example.posty.repository;

import com.example.posty.model.Officer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficerRepository extends JpaRepository<Officer, Long> {
}
