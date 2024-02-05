package com.example.demo.repository;


import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.Role;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface RoleRepository extends CrudRepository<Role, Integer> {

}