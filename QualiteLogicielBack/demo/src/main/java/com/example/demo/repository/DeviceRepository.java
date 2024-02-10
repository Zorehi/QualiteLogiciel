package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Device;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository; // Assurez-vous d'importer cette annotation

@Repository
public interface DeviceRepository extends CrudRepository<Device, Integer> {
    Device findById(int id);
    List<Device> findByName(String name);
    void deleteByDeviceRef(String deviceRef);
}