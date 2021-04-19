package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Class;
import com.melnychenko.portal.entity.TaskClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@RepositoryRestResource
public interface TaskClassRepository extends JpaRepository<TaskClass,Long> {
    @Query("select t.classEntity from task_class t where t.task.uuid in :uuid")
    List<Class> findAllClassesByTaskUuid(@Param("uuid") Long uuid);
}
