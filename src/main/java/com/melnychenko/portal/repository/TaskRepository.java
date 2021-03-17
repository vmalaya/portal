package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task,Long> {
}
