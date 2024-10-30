package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.entity.Order;

public interface OrderProductRepository extends JpaRepository<Order, Long> {
    
    @Transactional
    @Modifying
    @Query("DELETE FROM Order o WHERE o.id = :orderId")
    void deleteByOrderId(Long orderId);
}
