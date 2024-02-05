package com.example.demo.repository;


import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.Users;

import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UsersRepository extends CrudRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);
}
