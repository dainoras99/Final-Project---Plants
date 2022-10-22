package com.viko.plants.repository;

import com.viko.plants.entity.CartSession;
import com.viko.plants.entity.PlantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface CartSessionRepository extends JpaRepository<CartSession, Integer> {
}
