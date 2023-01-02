package com.viko.plants.service;

import com.viko.plants.entity.Plant;
import com.viko.plants.request.PlantUploadRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface PlantService {
    ResponseEntity<String> uploadPlant(PlantUploadRequest plantUploadRequest);
    ResponseEntity<String> deletePlant(Integer plantId);
    ResponseEntity<String> uploadImage(MultipartFile file);
    void UpdatePlantStock(Plant plant, Integer newStock);
}
