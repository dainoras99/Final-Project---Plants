package com.viko.plants.repository;

import com.viko.plants.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant, Integer> {
}
