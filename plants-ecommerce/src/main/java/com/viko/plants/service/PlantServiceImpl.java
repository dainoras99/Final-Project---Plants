package com.viko.plants.service;

import com.viko.plants.dto.OrdersResponse;
import com.viko.plants.entity.Order;
import com.viko.plants.entity.Plant;
import com.viko.plants.entity.PlantCategory;
import com.viko.plants.entity.User;
import com.viko.plants.repository.PlantCategoryRepository;
import com.viko.plants.repository.PlantRepository;
import com.viko.plants.request.PlantUploadRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class PlantServiceImpl implements PlantService {

    private PlantRepository plantRepository;
    private PlantCategoryRepository plantCategoryRepository;

    public PlantServiceImpl(PlantRepository plantRepository, PlantCategoryRepository plantCategoryRepository) {

        this.plantRepository = plantRepository;
        this.plantCategoryRepository = plantCategoryRepository;
    }

    @Override
    @Transactional
    public ResponseEntity<String> uploadPlant(PlantUploadRequest plantUploadRequest) {

        Plant plant = plantUploadRequest.getPlant();
       List<PlantCategory> plantCategories = plantCategoryRepository.findAll();
        for (PlantCategory tempPlantCategory : plantCategories) {
            if(tempPlantCategory.getName().equals(plantUploadRequest.getCategoryName())) {
                plant.setCategory(tempPlantCategory);
            }
        }
        if(plant.getCategory() == null) {
            PlantCategory plantCategory = new PlantCategory();
            plantCategory.setName(plantUploadRequest.getCategoryName());
            Set<Plant> plants = new LinkedHashSet<>();
            plants.add(plant);
            plantCategory.setPlants(plants);
            System.out.println(plantCategory.getName());
            plantCategoryRepository.save(plantCategory);
            List<PlantCategory> searchForPlantCategories = plantCategoryRepository.findAll();
            for (PlantCategory tempPlantCategory : searchForPlantCategories) {
                if(tempPlantCategory.getName().equals(plantUploadRequest.getCategoryName())) {
                    plant.setCategory(tempPlantCategory);
                }
            }
        }
       plantRepository.save(plant);
       return new ResponseEntity<>("Naujas augalas pridėtas", HttpStatus.CREATED);
    }
}
