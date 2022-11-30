package com.viko.plants.repository;

import com.viko.plants.entity.CartSession;
import com.viko.plants.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Set;

@CrossOrigin("http://localhost:4200")
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query(
            value ="SELECT * FROM order_table where user_id=?1",
            nativeQuery = true)
    Set<Order> findUserOrders(Integer userId);

    @Query(
            value="SELECT * FROM order_table where status=?1",
            nativeQuery = true)
    Set<Order> getOrdersByStatus(String status);

    @Modifying
    @Transactional
    @Query(
            value="UPDATE order_table SET status=?1 where id=?2",
            nativeQuery = true)
    void updateOrderStatusById(String status, Integer id);
}
