package com.viko.plants.repository;

import com.viko.plants.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Set;

@CrossOrigin("http://localhost:4200")
public interface CartSessionItemRepository extends JpaRepository<CartItem, Integer> {
    @Query(
            value ="SELECT * FROM cart_item WHERE cart_session_user_id=?1",
            nativeQuery = true)
    Set<CartItem> findAllSessionCartItems(Integer userId);

    @Modifying
    @Transactional
    @Query(
            value="DELETE FROM cart_item WHERE cart_session_user_id=?1",
            nativeQuery = true)
    void deleteAllSessionCartItems(Integer userId);
}
