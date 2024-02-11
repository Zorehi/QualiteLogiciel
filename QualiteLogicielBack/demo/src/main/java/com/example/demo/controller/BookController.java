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
import java.util.List;
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Vérifier si l'utilisateur existe
        Optional<Users> optionalUser = Optional.ofNullable(usersRepository.findById(bookRequest.getUsersId()));
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
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

        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Book>> getAllBooks(@RequestParam int id) {

        Users user = usersRepository.findById(id);

        List<Book> userBooks = bookRepository.findByUser(user);
        return ResponseEntity.ok(userBooks);
    }

    @GetMapping("/getdevice")
    public ResponseEntity<Book> getBookById(@RequestParam int userid, @RequestParam int deviceid) {

        Users user = usersRepository.findById(userid);
        Device device = deviceRepository.findById(deviceid);
        Optional<Book> optionalBook = bookRepository.findByUserAndDeviceAndEndDateIsNull(user, device);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();

            return ResponseEntity.ok(book);
        } else {

            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/isbook")
    public ResponseEntity<Boolean> getBookByIdDevice(@RequestParam int deviceid) {

        Device device = deviceRepository.findById(deviceid);
        Optional<Book> optionalBook = bookRepository.findByDeviceAndEndDateIsNull(device);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();

            return ResponseEntity.ok(Boolean.TRUE);
        } else {

            return ResponseEntity.ok(Boolean.FALSE);
        }

    }

    @PostMapping("/finish")
    public ResponseEntity<String> completeBook(@RequestParam int userid, @RequestParam int deviceid){
        Users user = usersRepository.findById(userid);
        Device device = deviceRepository.findById(deviceid);
        Optional<Book> optionalBook = bookRepository.findByUserAndDeviceAndEndDateIsNull(user, device);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setEndDate(LocalDateTime.now());
            bookRepository.save(book);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }
}

