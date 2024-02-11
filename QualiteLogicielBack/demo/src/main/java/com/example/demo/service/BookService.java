package com.example.demo.service;

import com.example.demo.model.Device;
import com.example.demo.model.Users;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Méthode pour enregistrer un book dans la base de données
    public void saveBook(Book book) {
        bookRepository.save(book);
    }
    @Transactional
    public void deleteUserWithBooks(Users user) {
        bookRepository.deleteByUser(user);
    }

    @Transactional
    public void deleteDeviceWithBooks(Device device) {
        bookRepository.deleteByDevice(device);
    }
}
