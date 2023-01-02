package com.viko.plants.controller;

import com.viko.plants.request.PlantUploadRequest;
import com.viko.plants.service.PlantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @DeleteMapping("api/v1/plants/deletePlant/{plantId}")
    public ResponseEntity<String> deletePlant(@PathVariable Integer plantId) {
        ResponseEntity<String> response = plantService.deletePlant(plantId);
        return response;
    }

    @PostMapping("api/v1/image/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("imageFile") MultipartFile file) {
        ResponseEntity<String> response = plantService.uploadImage(file);
        return response;
    }
}
