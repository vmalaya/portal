package com.melnychenko.portal;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataBaseLoader implements CommandLineRunner {
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        this.userRepository.save(new User("valentyna.me", "11111", "student"));
    }
}
