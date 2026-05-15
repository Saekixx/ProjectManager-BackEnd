package com.project.manager.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.manager.DTO.User.UserRequestDTO;
import com.project.manager.Models.Rol;
import com.project.manager.Models.User;
import com.project.manager.Repositories.RolRepository;
import com.project.manager.Repositories.UserRepository;
import com.project.manager.jwt.JwtUtil;


@Service
public class AuthService {
    @Autowired UserRepository userRepository;

    private final UserService userService;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserService userService, RolRepository rolRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    // Método para autenticar al usuario y generar un token JWT
    public String login(String email, String password) {
        Authentication authResult = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authResult);
        return jwtUtil.generateToken(authResult);
    }

    @Transactional
    public User register(UserRequestDTO data){
        if(userService.existByEmail(data.getEmail())){
            throw new RuntimeException("El correo electrónico ya está en uso");
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

    @Transactional
    public String update(Long id, UserRequestDTO data) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        if (data.getUsername() != null && !data.getUsername().isEmpty()) {
            user.setUsername(data.getUsername());
        }

        if (data.getFullname() != null && !data.getFullname().isEmpty()) {
            user.setFullname(data.getFullname());
        }

        if (data.getEmail() != null && !data.getEmail().isEmpty()) {
            user.setEmail(data.getEmail());
        }

        if (data.getPassword() != null && !data.getPassword().isEmpty()) {
            // Encriptar la nueva contraseña antes de guardarla
            String passwordEncriptada = passwordEncoder.encode(data.getPassword());
            user.setPassword(passwordEncriptada);
        }

        if (data.getRolId() != null) {
            Rol rol = rolRepository.findById(data.getRolId())
                .orElseThrow(() -> new RuntimeException("No se encontró el rol con ID: " + data.getRolId()));
            user.setRol(rol);
        }

        userRepository.save(user);
        return "Usuario actualizado exitosamente";
    }
}
