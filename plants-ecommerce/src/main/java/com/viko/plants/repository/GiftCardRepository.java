package com.viko.plants.repository;

import com.viko.plants.entity.GiftCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface GiftCardRepository extends JpaRepository<GiftCard, Integer> {

    GiftCard findByCode(@Param("code") String code);
}
