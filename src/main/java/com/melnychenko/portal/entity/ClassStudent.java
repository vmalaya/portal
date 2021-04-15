package com.melnychenko.portal.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@Entity(name = "class_student")
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
public class ClassStudent {
    @Id()
    @Column(name = "id")
    private Long uuid;
    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class classEntity;
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

}
