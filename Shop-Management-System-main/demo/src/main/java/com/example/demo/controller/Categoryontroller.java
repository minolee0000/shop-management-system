package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;

@RestController
@CrossOrigin(origins="*")
public class Categoryontroller {
    @Autowired
    private CategoryService categoryService;
    @GetMapping("/category")
    public ResponseEntity<List<Category>> getCatagories(){
        List<Category> categories= categoryService.getAllCategories();
        return ResponseEntity.status(200).body(categories);
    }
    
    @PostMapping("/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createCategory = categoryService.createCategory(category);
        
        return ResponseEntity.status(201).body(createCategory);
    }
    
}

