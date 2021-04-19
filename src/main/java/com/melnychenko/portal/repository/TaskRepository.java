package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
@RepositoryRestResource
public interface TaskRepository extends CrudRepository<Task,Long> {
}
