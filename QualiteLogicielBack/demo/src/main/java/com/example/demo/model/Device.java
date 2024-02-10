package com.example.demo.model;
import jakarta.persistence.*;
@Entity
@Table(name = "device")
public class Device {

    public Device() {
        // Default constructor
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id")
    private int deviceId;

    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @Column(name = "version", nullable = false, length = 15)
    private String version;

    @Column(name = "device_ref", nullable = false, length = 5)
    private String deviceRef;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "phone_number", length = 10)
    private String phoneNumber;




    public int getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(int deviceId) {
        this.deviceId = deviceId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDeviceRef() {
        return deviceRef;
    }

    public void setDeviceRef(String deviceRef) {
        this.deviceRef = deviceRef;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}