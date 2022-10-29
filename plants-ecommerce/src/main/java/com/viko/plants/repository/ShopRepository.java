package com.viko.plants.repository;

import com.viko.plants.entity.Plant;
import com.viko.plants.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ShopRepository extends JpaRepository<Shop, Integer> {
    Shop findById(@Param("id") Long id);
}
