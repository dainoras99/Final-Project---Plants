package com.viko.plants.repository;

import com.viko.plants.entity.OrderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface OrderTypeRepository extends JpaRepository<OrderType, Integer> {

}
