package com.example.demo.controller;

import com.example.demo.model.Users;
import com.example.demo.repository.UsersRepository;
import com.example.demo.service.BookService;
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
    @Autowired
    private BookService bookService;

    @PutMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody Users users) {
        usersService.addUsers(users);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(null);
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
                .body(null);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Users>> searchUsersByName(@RequestParam String matricule) {
        List<Users> users = usersService.getUsersByMatricule(matricule);
        return ResponseEntity.ok(users);
    }


    @GetMapping("/get")
    public ResponseEntity<Users> searchUsersById(@RequestParam int id){
        Users users = usersService.getUsersById(id);

        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUsersById(@RequestParam int id){
        Users user = userRepository.findById(id);
        bookService.deleteUserWithBooks(user);
        userRepository.delete(userRepository.findById(id));
        return ResponseEntity.ok(null);
    }
}

