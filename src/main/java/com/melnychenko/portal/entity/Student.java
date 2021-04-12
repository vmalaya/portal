package com.melnychenko.portal.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
public class Student {
    @Id
    private Long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @ManyToMany(mappedBy = "students")
    private List<Class> classes;
    @ManyToMany(mappedBy = "students")
    private List<Task> tasks;

    public Student(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public Student(Long id, String username, String password, List<Task> tasks) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.tasks = tasks;
    }
}
