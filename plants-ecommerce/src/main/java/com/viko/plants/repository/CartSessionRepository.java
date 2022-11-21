package com.viko.plants.repository;

import com.viko.plants.entity.CartSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigInteger;

@CrossOrigin("http://localhost:4200")
public interface CartSessionRepository extends JpaRepository<CartSession, Integer> {

    @Modifying
    @Transactional
    @Query(
            value="DELETE FROM cart_session WHERE user_id=?1",
            nativeQuery = true)
    void deleteCartSession(Integer userId);

    @Query(value="SELECT COUNT(id) FROM cart_session where user_id=?1",
          nativeQuery = true)
    long UserSessionExist(Integer userId);

    @Query(
            value ="SELECT * FROM cart_session where user_id=?1",
            nativeQuery = true)
    CartSession findUserSession(Integer userId);
}
