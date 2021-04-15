package com.melnychenko.portal.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@Entity(name = "task_student")
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
public class TaskStudent {
    @Id()
    @Column(name = "id")
    private Long uuid;
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

}
