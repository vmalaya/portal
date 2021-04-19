package com.melnychenko.portal.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsFilter {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods(HttpMethod.OPTIONS.name(),
                                        HttpMethod.PATCH.name(),
                                        HttpMethod.PUT.name(),
                                        HttpMethod.DELETE.name(),
                                        HttpMethod.GET.name(),
                                        HttpMethod.POST.name())
                        .maxAge(360);
            }
        };
    }
}
