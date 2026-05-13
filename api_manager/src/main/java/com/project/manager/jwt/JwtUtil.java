package com.project.manager.jwt;

import org.springframework.beans.factory.annotation.Value;

public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Integer expiration;
}
