package com.viko.plants.repository;

import com.viko.plants.entity.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ParcelRepository extends JpaRepository<Parcel, Integer> {
}
