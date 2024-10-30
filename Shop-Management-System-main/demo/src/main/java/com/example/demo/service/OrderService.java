package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Order;

@Service
public interface OrderService {
    List<Order> getAllOrders();
    Order createOrder(Order order);
}