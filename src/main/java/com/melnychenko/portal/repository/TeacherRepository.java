package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Teacher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
@RepositoryRestResource
public interface TeacherRepository extends CrudRepository<Teacher,Long> {
    Teacher findByUsername(String username);
}
