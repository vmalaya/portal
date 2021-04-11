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
public class Task {
    @Id()
    @Column(name = "id")
    private Long uuid;
    @Column(nullable = false)
    private String title;
    @Column
    private String description;
    @ManyToOne
    @JoinColumn(name = "created_by")
    private Teacher createdBy;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "task_student",
            joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id"))
    private List<Student> students;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "task_class",
            joinColumns = @JoinColumn(name = "class_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id"))
    private List<Class> classes;

    public Task(Long uuid, String title, String description, Teacher createdBy) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
    }
}
