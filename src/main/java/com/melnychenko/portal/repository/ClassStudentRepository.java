package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.ClassStudent;
import com.melnychenko.portal.entity.Student;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@RepositoryRestResource
public interface ClassStudentRepository extends CrudRepository<ClassStudent,Long> {
    @Query("select c.student from class_student c where c.classEntity.uuid in :uuid")
    List<Student> findAllStudentByClassUuid(@Param("uuid") Long uuid);
    @Modifying
    @Transactional
    @Query("delete from class_student c where c.classEntity.uuid in :class and c.student.uuid in :student")
    void deleteClassStudentByClassAndStudent(@Param("class") Long group, @Param("student") Long student);
}
