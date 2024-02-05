package com.example.demo.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "users")
public class Users{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UsersId")
    private int usersId;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "Lastname", nullable = false)
    private String lastname;

    @Column(name = "Firstname", nullable = false)
    private String firstname;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @Column(name = "Matricule", nullable = false, unique = true)
    private String matricule;

    @Column(name = "FirstConnection")
    private Boolean firstConnection;

    @ManyToOne
    @JoinColumn(name = "RoleId", referencedColumnName = "RoleId", nullable = false)
    private Role role;

    public int getUsersId() {
        return usersId;
    }

    public void setUsersId(int usersId) {
        this.usersId = usersId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public Boolean getFirstConnection() {
        return firstConnection;
    }

    public void setFirstConnection(Boolean firstConnection) {
        this.firstConnection = firstConnection;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
// Getter and Setter methods
}
