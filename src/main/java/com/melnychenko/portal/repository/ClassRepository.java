package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Class;
import com.melnychenko.portal.entity.Student;
import org.springframework.data.repository.CrudRepository;

public interface ClassRepository extends CrudRepository<Class,Long> {
}
