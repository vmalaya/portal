package com.melnychenko.portal;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.melnychenko.portal.entity.Class;
import com.melnychenko.portal.entity.Student;
import com.melnychenko.portal.entity.Task;
import com.melnychenko.portal.entity.Teacher;
import com.melnychenko.portal.repository.ClassRepository;
import com.melnychenko.portal.repository.StudentRepository;
import com.melnychenko.portal.repository.TaskRepository;
import com.melnychenko.portal.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

import static java.util.Collections.*;

@Component
@RequiredArgsConstructor
public class DataBaseLoader implements CommandLineRunner {
    private final TeacherRepository teacherRepository;
    private final TaskRepository taskRepository;
    private final StudentRepository studentRepository;
    private final ClassRepository classRepository;

    @Override
    public void run(String... args) {
        // create teacher
        Teacher teacher = new Teacher(1L, "11111", "student");
        this.teacherRepository.save(teacher);
        // create task
        Task task = new Task(1L, "First Task", "First Description", teacher);
        this.taskRepository.save(task);
        // create student
        Student student = new Student(1L, "student1name", "student1password");
        student.setTasks(singletonList(task));
        this.studentRepository.save(student);
        // assign task to student
        Task updatedTask = this.taskRepository.findById(task.getUuid()).get();
        updatedTask.setStudents(singletonList(student));
        this.taskRepository.save(updatedTask);
        // create class
        Class group = new Class(1L, "group1", teacher);
        group.setStudents(singletonList(student));
        this.classRepository.save(group);
        // assign student to the class
        Student studentToBeUpdated = this.studentRepository.findById(student.getId()).get();
        studentToBeUpdated.setClasses(singletonList(group));
        this.studentRepository.save(studentToBeUpdated);
        // assign teacher to the class
        Teacher teacherToBeUpdated = this.teacherRepository.findById(teacher.getId()).get();
        teacherToBeUpdated.setClasses(singletonList(group));
        this.teacherRepository.save(teacherToBeUpdated);
        // assign class to the task
        Class groupToBeUpdatedWithTask = this.classRepository.findById(group.getId()).get();
        groupToBeUpdatedWithTask.setTasks(singletonList(updatedTask));
        this.classRepository.save(groupToBeUpdatedWithTask);
        // assign task to the class
        Task taskToBeUpdatedWithClass = this.taskRepository.findById(updatedTask.getUuid()).get();
        taskToBeUpdatedWithClass.setClasses(singletonList(groupToBeUpdatedWithTask));
        this.taskRepository.save(taskToBeUpdatedWithClass);
    }
}
