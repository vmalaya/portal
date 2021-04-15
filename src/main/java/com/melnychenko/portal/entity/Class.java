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
    @Id()
    @Column(name = "id")
    private Long uuid;
    @Column(nullable = false)
    private String name;
    @ManyToOne
    @JoinColumn(name = "owner")
    private Teacher owner;
    @OneToMany(mappedBy = "classEntity")
    private List<ClassStudent> students;
    @ManyToMany(mappedBy = "classes")
    private List<Task> tasks;

    public Class(Long id, String name) {
        this.uuid = id;
        this.name = name;
    }

    public Class(Long id, String name, Teacher owner) {
        this.uuid = id;
        this.name = name;
        this.owner = owner;
    }
}
