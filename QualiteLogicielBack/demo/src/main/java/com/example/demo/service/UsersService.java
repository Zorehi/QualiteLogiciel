package com.example.demo.service;

import com.example.demo.model.Users;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public void addUsers(Users users) {
        // Enregistrement du Users dans la base de données
        usersRepository.save(users);
    }

    public void updateUsers(Users users) {
        // Mettre à jour le Device dans la base de données
        usersRepository.save(users);
    }

    public List<Users> getUsersByMatricule(String search) {
        return usersRepository.findUsersByFirstnameContainsOrLastnameContainsOrMatriculeContainsOrEmailContains(search, search, search, search);
    }
    public Users getUsersById(int id) {
        return usersRepository.findById(id);
    }
}
