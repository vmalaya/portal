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
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String name;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_class",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "class_id", referencedColumnName = "id"))
    private Set<User> users;
    @ManyToMany(mappedBy = "toClass")
    private Set<Task> assignedToClass;

    public Class(String name) {
        this.name = name;
    }
}
