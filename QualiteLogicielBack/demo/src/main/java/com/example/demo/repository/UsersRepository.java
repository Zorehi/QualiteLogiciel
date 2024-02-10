package com.example.demo.repository;

import com.example.demo.model.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends CrudRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);

    Users findById(int id);

    List<Users> findByMatricule(String matricule);
}