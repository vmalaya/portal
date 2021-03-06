package com.melnychenko.portal;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String role;
    @ManyToMany(mappedBy = "users")
    private Set<Group> groups;
    @OneToMany(mappedBy = "createdBy")
    private Set<Task> createdTasks;
    @ManyToMany(mappedBy = "toUser")
    private Set<Task> assignedToUser;

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
