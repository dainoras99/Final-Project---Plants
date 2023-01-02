package com.viko.plants.service;

import com.viko.plants.entity.Plant;
import com.viko.plants.entity.PlantCategory;
import com.viko.plants.repository.PlantCategoryRepository;
import com.viko.plants.repository.PlantRepository;
import com.viko.plants.request.PlantUploadRequest;
import lombok.SneakyThrows;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.transaction.Transactional;
import java.io.*;
import java.util.List;
import java.util.Optional;

@Service
public class PlantServiceImpl implements PlantService {

    private PlantRepository plantRepository;
    private PlantCategoryRepository plantCategoryRepository;

    public PlantServiceImpl(PlantRepository plantRepository, PlantCategoryRepository plantCategoryRepository) {

        this.plantRepository = plantRepository;
        this.plantCategoryRepository = plantCategoryRepository;
    }

    @SneakyThrows
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
            System.out.println("sveikivel");
            PlantCategory plantCategory = new PlantCategory();
            plantCategory.setName(plantUploadRequest.getCategoryName());
            plantCategoryRepository.save(plantCategory);
            List<PlantCategory> searchForPlantCategories = plantCategoryRepository.findAll();
            for (PlantCategory tempPlantCategory : searchForPlantCategories) {
                if(tempPlantCategory.getName().equals(plantUploadRequest.getCategoryName())) {
                    System.out.println("sveiki");
                    plant.setCategory(tempPlantCategory);
                }
            }
        }
        plant.setImageUrl("assets/images/Photos/plant" + plantUploadRequest.getSelectedFileName());
       plantRepository.save(plant);
       return new ResponseEntity<>("Naujas augalas pridėtas", HttpStatus.CREATED);
    }

    @Override
    @Transactional
    public ResponseEntity<String> deletePlant(Integer plantId) {
        Optional<Plant> plant = plantRepository.findById(plantId);
        plantRepository.delete(plant.get());
        return new ResponseEntity<>("Augalas pašalintas", HttpStatus.OK);
    }

    public ResponseEntity<String> uploadImage (MultipartFile file) {
        try {
            InputStream input = new ByteArrayInputStream(file.getBytes());
            OutputStream output = new FileOutputStream
                    ("C:/Users/daino/OneDrive/Stalinis kompiuteris/Final-Project---Plants/" +
                            "angular-plants/angular-plants/src/assets/images/Photos/plant" + file.getOriginalFilename());
            IOUtils.copy(input, output);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Nuotrauka išsaugota", HttpStatus.OK);
    }

    @Override
    @Transactional
    public void UpdatePlantStock(Plant plant,Integer quantity) {
        Integer newStock = plant.getInStock() - quantity;
        plant.setInStock(newStock);
        plantRepository.save(plant);
    }
}
