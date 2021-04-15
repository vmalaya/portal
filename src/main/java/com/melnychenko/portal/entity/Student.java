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
public class Student {
    @Id()
    @Column(name = "id")
    private Long uuid;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @OneToMany(mappedBy = "student")
    private Set<TaskStudent> tasks;
    @OneToMany(mappedBy = "student")
    private List<ClassStudent> classes;

    public Student(Long id, String username, String password) {
        this.uuid = id;
        this.username = username;
        this.password = password;
    }

    public Student(Long id, String username, String password, Set<TaskStudent> tasks) {
        this.uuid = id;
        this.username = username;
        this.password = password;
        this.tasks = tasks;
    }
}
