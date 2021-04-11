package com.melnychenko.portal;

import com.melnychenko.portal.entity.Class;
import com.melnychenko.portal.entity.Student;
import com.melnychenko.portal.entity.Task;
import com.melnychenko.portal.entity.Teacher;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Component
public class ExposeEntityIdRestConfiguration implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Task.class, Class.class, Student.class, Teacher.class);
    }
}
