package com.melnychenko.portal.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@Entity(name = "task_class")
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
public class TaskClass {
    @Id()
    @Column(name = "id")
    private Long uuid;
    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class classEntity;
    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

}
