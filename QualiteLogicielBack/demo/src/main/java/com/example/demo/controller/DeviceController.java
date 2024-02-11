package com.example.demo.controller;

import com.example.demo.model.Device;
import com.example.demo.repository.DeviceRepository;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.DeviceService;

import java.util.List;

@RestController
@RequestMapping("/device")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;
    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private BookService bookService;

    @PutMapping("/add")
    public ResponseEntity<String> addDevice(@RequestBody Device device)  {

        deviceService.addDevice(device);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(null);
    }
    @PatchMapping("/modify")
    public ResponseEntity<String> ModifyDevice(@RequestBody Device device) {
        Device existingDevice = deviceRepository.findById(device.getDeviceId());
        existingDevice.setName(device.getName());
        existingDevice.setVersion(device.getVersion());
        existingDevice.setDeviceRef(device.getDeviceRef());
        existingDevice.setImage(device.getImage());
        existingDevice.setPhoneNumber(device.getPhoneNumber());

        deviceService.updateDevice(existingDevice);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(null);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Device>> searchDevicesByName(@RequestParam String name) {
        List<Device> devices = deviceService.getDevicesByName(name);
        return ResponseEntity.ok(devices);
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDeviceById(@PathVariable int id) {
        Device device = deviceRepository.findById(id);
        bookService.deleteDeviceWithBooks(device);
        deviceService.deleteDeviceById(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/get")
    public ResponseEntity<Device> searchDevicesById(@RequestParam int id) {
        Device device = deviceRepository.findById(id);
        return ResponseEntity.ok(device);
    }
}
