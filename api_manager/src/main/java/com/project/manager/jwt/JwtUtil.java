package com.project.manager.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret; // Valor de la propiedad jwt.secret definido en el archivo application.properties
    
    @Value("${jwt.expiration}")
    private Integer expiration; // Valor de la propiedad jwt.expiration definido en el archivo application.properties (en segundos)

    public String generateToken(Authentication auth){
        // Obtenemos el usuario autenticado
        UserDetails mainUser = (UserDetails) auth.getPrincipal();
        // Obtenemos los roles del usuario autenticado
        List<String> roles = mainUser.getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());
        // Creamos la clave secreta a partir del valor de la propiedad jwt.secret
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        // Construimos el token JWT con la información del usuario autenticado, 
        // los roles, la fecha de emisión y la fecha de expiración
        return Jwts.builder().setSubject(mainUser.getUsername())
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration * 1000L))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
    // Validamos el token JWT comparando el nombre de usuario extraído del token 
    // con el nombre de usuario del UserDetails
    public Boolean validateToken(String token, UserDetails userDetails){
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (Exception e) {
            return false; 
    }
    }
    // Verificamos si el token JWT ha expirado comparando la fecha de expiración 
    // extraída del token con la fecha actual
    public Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }
    // Extraemos la fecha de expiración del token JWT utilizando el método 
    // extractAllClaims para obtener los reclamos del token y luego obtenemos la fecha de expiración
    public Date extractExpiration(String token){
        return extractAllClaims(token).getExpiration();
    }
    // Extraemos todos los reclamos del token JWT utilizando la clave secreta para 
    // validar el token y obtener su contenido
    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
    }
    // Extraemos el nombre de usuario del token JWT utilizando el método extractAllClaims 
    // para obtener los reclamos del token y luego obtenemos el sujeto (nombre de usuario)
    public String extractUsername(String token){
        return extractAllClaims(token).getSubject();
    }
}
