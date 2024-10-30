package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Product;

public interface ProductService {
    List<Product> getAllProducts();
    Product createProduct(Product product);
    Product updateProduct(Long id, Product product);
    Product getProductById(Long id);
    void deleteProduct(Long id);
}
