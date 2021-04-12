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
public class Class {
    @Id
    @GeneratedValue()
    private Long id;
    @Column(nullable = false)
    private String name;
    @ManyToOne
    @JoinColumn(name = "owner")
    private Teacher owner;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "class_student",
            joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "class_id", referencedColumnName = "id"))
    private List<Student> students;

    public Class(Long id, String name, Teacher owner) {
        this.id = id;
        this.name = name;
        this.owner = owner;
    }

    public Class(Long id, String name, Teacher owner, List<Student> students) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.students = students;
    }
}
