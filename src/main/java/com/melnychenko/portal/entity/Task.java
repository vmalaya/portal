package com.melnychenko.portal;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column
    private String description;
    @ManyToOne
    private User createdBy;
    @Column
    private String status;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "task_assignee",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id"))
    private Set<User> toUser;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "task_assignee",
        joinColumns = @JoinColumn(name = "class_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id"))
    private Set<Class> toClass;

    public Task(String title, String description, User createdBy, Set<User> toUser, Set<Class> toClass, String status) {
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
        this.toUser = toUser;
        this.toClass = toClass;
        this.status = status;
    }
}
