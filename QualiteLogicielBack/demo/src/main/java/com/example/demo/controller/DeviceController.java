package com.example.demo.controller;

import com.example.demo.model.Device;
import com.example.demo.repository.DeviceRepository;
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

    @PutMapping("/add")
    public ResponseEntity<String> addDevice(@RequestBody Device device)  {

        deviceService.addDevice(device);




        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Device ajouté avec succès. ID : " + device.getDeviceId());
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
                .body("Device modifié avec succès. ID : " + device.getDeviceId());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Device>> searchDevicesByName(@RequestParam String name) {
        List<Device> devices = deviceService.getDevicesByName(name);
        if (devices.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(devices);
    }

    @DeleteMapping("/delete/{deviceRef}")
    public ResponseEntity<String> deleteDeviceByRef(@PathVariable String deviceRef) {
        deviceService.deleteDeviceByDeviceRef(deviceRef);
        return ResponseEntity.ok("Device supprimé avec succès");
    }
}
