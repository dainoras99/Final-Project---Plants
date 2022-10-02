package com.viko.plants.repository;

import com.viko.plants.entity.PlantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "plantCategory", path = "plant-category")
public interface PlantCategoryRepository extends JpaRepository<PlantCategory, Integer> {

}
