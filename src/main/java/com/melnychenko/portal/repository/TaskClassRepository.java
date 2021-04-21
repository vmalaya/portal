package com.melnychenko.portal.repository;

import com.melnychenko.portal.entity.Class;
import com.melnychenko.portal.entity.TaskClass;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@RepositoryRestResource
public interface TaskClassRepository extends JpaRepository<TaskClass,Long> {
    @Query("select t.classEntity from task_class t where t.task.uuid in :uuid")
    List<Class> findAllClassesByTaskUuid(@Param("uuid") Long uuid);
    @Modifying
    @Transactional
    @Query("delete from task_class t where t.task.uuid in :task and t.classEntity.uuid in :class")
    void deleteTaskClassByTaskAndClass(@Param("task") Long task, @Param("class") Long group);

}
