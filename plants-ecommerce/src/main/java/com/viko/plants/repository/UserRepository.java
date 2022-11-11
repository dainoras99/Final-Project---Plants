package com.viko.plants.repository;

import com.viko.plants.entity.CartItem;
import com.viko.plants.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(@Param("name") String username);
    List<User> findAll();
}
