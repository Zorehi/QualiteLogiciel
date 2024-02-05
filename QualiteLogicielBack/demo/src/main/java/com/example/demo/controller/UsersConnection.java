package com.example.demo.controller;

import com.example.demo.repository.UsersRepository;
import com.example.demo.model.Users;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;
@Controller // This means that this class is a Controller
@RequestMapping(path="/login")
public class UsersConnection {
    @Autowired
    private final UsersRepository userRepository;

    public UsersConnection(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(path="/trylogin")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        Optional<Users> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            // Premiere connexion
            if(user.getFirstConnection() == Boolean.TRUE && user.getPassword().equals(password)){
                return ResponseEntity.ok("Première connexion");
            }
            //Cas passant
            if (user.getPassword().equals(password)) {
                return ResponseEntity.ok("Authentification reussie");
            }
            // Mauvais MdP
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mot de passe incorect");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Aucun identifiant trouvé");
    }
}
