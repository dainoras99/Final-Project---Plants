package com.viko.plants.controller;

import com.viko.plants.request.OrderRequestBody;
import com.viko.plants.request.PlantUploadRequest;
import com.viko.plants.service.PlantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlantController {

    private PlantService plantService;

    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @PostMapping("api/v1/plants/addPlant")
    public ResponseEntity<String> postPlant(@RequestBody PlantUploadRequest plantUploadRequest) {
        ResponseEntity<String> response = plantService.uploadPlant(plantUploadRequest);
        return response;
    }
}
