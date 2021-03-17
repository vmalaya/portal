package com.melnychenko.portal.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Entity
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
public class Teacher {
    @Id
    private Long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @OneToMany(mappedBy = "owner")
    private List<Class> classes;
    @OneToMany(mappedBy = "createdBy")
    private Set<Task> tasks;

    public Teacher(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public Teacher(Long id, String username, String password, List<Class> classes, Set<Task> tasks) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.classes = classes;
        this.tasks = tasks;
    }
}
