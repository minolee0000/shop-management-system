package com.example.demo.service;


import java.util.List;

import com.example.demo.entity.Category;


public interface CategoryService {
    List <Category> getAllCategories();
    Category createCategory(Category category);
    Category getCategoryById(Long Id);

}
