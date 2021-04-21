package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Student;
import com.melnychenko.portal.entity.TaskStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@RepositoryRestResource
public interface TaskStudentRepository extends JpaRepository<TaskStudent, Long> {
    @Query("select t.student from task_student t where t.task.uuid in :uuid")
    List<Student> findAllStudentByTaskUuid(@Param("uuid") Long uuid);
}
