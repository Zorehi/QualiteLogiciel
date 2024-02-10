package com.example.demo.controller;

import com.example.demo.model.Users;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.UsersService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService usersService;
    @Autowired
    private UsersRepository userRepository;

    @PutMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody Users users) {
        usersService.addUsers(users);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Utilisateur ajouté avec succès. ID : " + users.getUsersId());
    }

    @PatchMapping("/modify")
    public ResponseEntity<String> ModifyUsers(@RequestBody Users users) {
        Users existingUsers = userRepository.findById(users.getUsersId());
        existingUsers.setFirstname(users.getFirstname());
        existingUsers.setLastname(users.getLastname());
        existingUsers.setEmail(users.getEmail());
        existingUsers.setMatricule(users.getMatricule());
        existingUsers.setRole(users.getRole());

        usersService.updateUsers(existingUsers);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Users modifié avec succès. ID : " + users.getUsersId());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Users>> searchUsersByName(@RequestParam String matricule) {
        List<Users> users = usersService.getUsersByMatricule(matricule);
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
    }


    @GetMapping("/get")
    public ResponseEntity<Users> searchUsersById(@RequestParam int id){
        Users users = usersService.getUsersById(id);

        return ResponseEntity.ok(users);
    }
}

