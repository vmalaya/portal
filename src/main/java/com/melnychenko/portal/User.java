package com.melnychenko.portal;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
public class User {
    private @Id @GeneratedValue Long id;
    private String username;
    private String password;
    private String role;

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
