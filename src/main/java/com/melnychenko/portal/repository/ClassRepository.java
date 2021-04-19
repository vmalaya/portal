package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Class;
import com.melnychenko.portal.entity.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
@RepositoryRestResource
public interface ClassRepository extends CrudRepository<Class,Long> {
}
