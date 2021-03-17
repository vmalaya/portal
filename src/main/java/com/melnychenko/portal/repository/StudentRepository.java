package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student,Long> {
}
