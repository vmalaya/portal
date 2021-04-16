package com.melnychenko.portal.security;

import com.melnychenko.portal.entity.Teacher;
import com.melnychenko.portal.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Component;

import java.util.*;

import static java.util.Collections.singletonList;
import static java.util.Objects.isNull;

@Component
public class H2UserDetailsService implements UserDetailsService {
    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Teacher teacher = teacherRepository.findByUsername(username);

        if(isNull(teacher)) throw new UsernameNotFoundException("User not found");

        List<SimpleGrantedAuthority> authorities = singletonList(new SimpleGrantedAuthority("user"));
        return new User(teacher.getUsername(), teacher.getPassword(), authorities);
    }
}
