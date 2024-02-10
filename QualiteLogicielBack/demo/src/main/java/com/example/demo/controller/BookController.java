package com.example.demo.controller;

import com.example.demo.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.DeviceRepository;
import com.example.demo.repository.UsersRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createBook(@RequestBody BookRequest bookRequest) {
        // Vérifier si le device existe
        Optional<Device> optionalDevice = Optional.ofNullable(deviceRepository.findById(bookRequest.getDeviceId()));
        if (optionalDevice.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Device non trouvé");
        }

        // Vérifier si l'utilisateur existe
        Optional<Users> optionalUser = Optional.ofNullable(usersRepository.findById(bookRequest.getUsersId()));
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        }
        BookId bookId = new BookId();
        bookId.setDeviceId(bookRequest.getDeviceId());
        bookId.setStartDate(LocalDateTime.now());

        // Créer un nouveau book
        Book book = new Book();
        book.setId(bookId);
        book.setDevice(optionalDevice.get());
        book.setUser(optionalUser.get());
        book.setStartDate(LocalDateTime.now());
        book.setEndDate(null);

        // Enregistrer le book dans la base de données
        bookRepository.save(book);

        return ResponseEntity.status(HttpStatus.CREATED).body("Book créé avec succès");
    }
}

