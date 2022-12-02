package com.viko.plants.service;

import com.viko.plants.dto.OrdersResponse;
import com.viko.plants.entity.Plant;
import com.viko.plants.request.PlantUploadRequest;
import org.springframework.http.ResponseEntity;

public interface PlantService {
    ResponseEntity<String> uploadPlant(PlantUploadRequest plantUploadRequest);
    ResponseEntity<String> deletePlant(Integer plantId);
}
