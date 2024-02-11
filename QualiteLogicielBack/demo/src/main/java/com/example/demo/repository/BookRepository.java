package com.example.demo.repository;

import com.example.demo.model.Device;
import com.example.demo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Book;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Optional<Book> findByUserAndDeviceAndEndDateIsNull(Users users, Device device);

    Optional<Book> findByDeviceAndEndDateIsNull(Device device);

    List<Book> findByUser(Users user);
}

