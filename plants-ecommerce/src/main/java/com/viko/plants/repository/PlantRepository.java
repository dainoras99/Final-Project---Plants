package com.viko.plants.repository;

import com.sun.mail.imap.protocol.ID;
import com.viko.plants.entity.Plant;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.domain.Page;

@CrossOrigin("http://localhost:4200")
public interface PlantRepository extends JpaRepository<Plant, Integer> {
    Page<Plant> findByCategoryId(@Param("id") Integer id, Pageable pageable);
    Page<Plant> findByNameContaining(@Param("name") String name, Pageable page);
    Plant findByName(@Param("name") String name);
}
