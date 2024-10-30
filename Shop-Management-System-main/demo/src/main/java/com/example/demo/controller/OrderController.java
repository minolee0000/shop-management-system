package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.service.OrderProductService;
import com.example.demo.service.OrderService;
import com.example.demo.service.ProductService;

@RestController
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderProductService orderProductService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderDTO) {
        Order order = new Order();
        order.setTotalPrice(0.0);
        
        List<Long> productIds = orderDTO.getProductIds();
        List<Product> orderedProducts = new ArrayList<>();

        for (Long productId : productIds) {
            Product product = productService.getProductById(productId);
            if (product != null) {
                orderedProducts.add(product);
                order.setTotalPrice(order.getTotalPrice() + product.getPrice());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Product with ID " + productId + " not found.");
            }
        }
        
        order.setOrderedProducts(orderedProducts);
        orderService.createOrder(order);

        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        try {
            orderProductService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Order Deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete order: " + e.getMessage());
        }
    }
}
