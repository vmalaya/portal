package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Student;
import com.melnychenko.portal.entity.TaskStudent;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@RepositoryRestResource
public interface TaskStudentRepository extends JpaRepository<TaskStudent, Long> {
    @Query("select t.student from task_student t where t.task.uuid in :uuid")
    List<Student> findAllStudentByTaskUuid(@Param("uuid") Long uuid);
    @Modifying
    @Transactional
    @Query("delete from task_student t where t.task.uuid in :task and t.student.uuid in :student")
    void deleteTaskStudentByTaskAndStudent(@Param("task") Long task, @Param("student") Long student);
}
