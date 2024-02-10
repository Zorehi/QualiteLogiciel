package com.example.demo.service;

import com.example.demo.model.Device;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.DeviceRepository;

import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private  DeviceRepository deviceRepository;



    public void addDevice(Device device) {
        // Enregistrement du Device dans la base de données
        deviceRepository.save(device);
    }

    public void updateDevice(Device device) {
        // Mettre à jour le Device dans la base de données
        deviceRepository.save(device);
    }

    public List<Device> getDevicesByName(String name) {
        return deviceRepository.findDevicesByNameContains(name);
    }
    @Transactional
    public void deleteDeviceByDeviceRef(String deviceRef) {
        deviceRepository.deleteByDeviceRef(deviceRef);
    }



}
