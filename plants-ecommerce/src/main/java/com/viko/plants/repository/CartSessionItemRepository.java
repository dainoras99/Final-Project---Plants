package com.viko.plants.repository;

import com.viko.plants.entity.CartItem;
import com.viko.plants.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Set;

@CrossOrigin("http://localhost:4200")
public interface CartSessionItemRepository extends JpaRepository<CartItem, Integer> {
    @Query(
            value ="SELECT * FROM cart_item WHERE cart_session_user_id=?1",
            nativeQuery = true)
    Set<CartItem> findAllSessionCartItems(Integer userId);
}
