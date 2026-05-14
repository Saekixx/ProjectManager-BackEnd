package com.project.manager.Services;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.manager.DTO.User.UserRequestDTO;
import com.project.manager.Models.Rol;
import com.project.manager.Models.User;
import com.project.manager.Repositories.RolRepository;
import com.project.manager.jwt.JwtUtil;


@Service
public class AuthService {
    
    private final UserService userService;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthService(UserService userService, RolRepository rolRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManagerBuilder = new AuthenticationManagerBuilder(null);
    }

    // Método para autenticar al usuario y generar un token JWT
    public String authenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authResult = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authResult);
        return jwtUtil.generateToken(authResult);
    }

    @Transactional
    public User register(UserRequestDTO data){
        if(userService.existByUsername(data.getUsername())){
            throw new RuntimeException("El nombre de usuario ya existe");
        }
        // Buscar los roles en la base de datos, si no existen lanzar una excepción
        Rol rol = rolRepository.findById(data.getRolId())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + data.getRolId()));
        // Crear el nuevo usuario con el rol de USER
        User user = new User(); 
        user.setUsername(data.getUsername());
        user.setEmail(data.getEmail());
        user.setFullname(data.getFullname());
        user.setPassword(passwordEncoder.encode(data.getPassword()));
        user.setRol(rol);
        // Guardar el nuevo usuario en la base de datos
        return userService.save(user);
    }
}
