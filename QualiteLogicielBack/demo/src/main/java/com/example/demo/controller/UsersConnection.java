package com.example.demo.controller;

import com.example.demo.model.Login;
import com.example.demo.model.Password;
import com.example.demo.repository.UsersRepository;
import com.example.demo.model.Users;
import com.example.demo.service.UsersService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
@Controller
@RequestMapping(path="/login")
public class UsersConnection {
    @Autowired
    private final UsersRepository userRepository;
    @Autowired
    private UsersService usersService;

    public UsersConnection(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(path="/trylogin")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Login login) {
        Optional<Users> optionalUser = userRepository.findByEmail(login.getEmail());
        Map<String, Object> response = new HashMap<>();
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            // Premiere connexion
            if (user.getFirstConnection() == Boolean.TRUE && user.getPassword().equals(login.getPassword())) {
                response.put("success", true);
                response.put("firstConnection", true);
                return ResponseEntity.ok(response);
            }
            //Cas passant
            if (user.getPassword().equals(login.getPassword())) {
                response.put("success", true);
                response.put("firstConnection", false);
                return ResponseEntity.ok(response);
            }
            // Mauvais MdP
            else {
                response.put("success", false);
                response.put("error", "Mot de passe incorrect");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }
        response.put("success", false);
        response.put("error", "Aucun identifiant trouvé");

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @PatchMapping("/firstconnection")
    public ResponseEntity<String> firstConnection(@RequestBody Password newPassword){
        Users user = userRepository.findById(newPassword.getId());
        user.setPassword(newPassword.getPassword());
        user.setFirstConnection(false);
        usersService.updateUsers(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Mot de passe modifié avec succès. ID : " + user.getUsersId());
    }


}
