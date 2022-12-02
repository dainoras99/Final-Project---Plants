package com.viko.plants.repository;

import com.viko.plants.entity.PlantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "plantCategory", path = "plant-category")
public interface PlantCategoryRepository extends JpaRepository<PlantCategory, Integer> {
    List<PlantCategory> findAll();
}
