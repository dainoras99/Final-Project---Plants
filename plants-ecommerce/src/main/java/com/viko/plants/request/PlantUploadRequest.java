package com.viko.plants.request;

import com.viko.plants.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class PlantUploadRequest {
    private final Plant plant;
    private final String categoryName;
    private final String selectedFileName;
}
