package com.example.demo.repository;

import java.util.List;

import com.example.demo.model.Device;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Integer> {
    Device findById(int id);
    List<Device> findDevicesByNameContains(String name);
    void deleteByDeviceRef(String deviceRef);

}