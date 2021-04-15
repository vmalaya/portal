package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.ClassStudent;
import com.melnychenko.portal.entity.TaskStudent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource
public interface ClassStudentRepository extends CrudRepository<ClassStudent,Long> {
}
