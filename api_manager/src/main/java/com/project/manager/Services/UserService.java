package com.project.manager.Services;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.manager.DTO.User.UserDTO;
import com.project.manager.DTO.User.UserRequestDTO;
import com.project.manager.Models.Rol;
import com.project.manager.Models.User;
import com.project.manager.Repositories.RolRepository;
import com.project.manager.Repositories.UserRepository;

import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
public class UserService implements UserDetailsService {
    @Autowired private UserRepository userRepository;
    @Autowired private RolRepository rolRepository;

    // Auth Service para cargar el usuario por username y validar el token JWT
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRol().getName());

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(), 
            user.getPassword(), 
            Collections.singleton(authority)
        );
    }

    public boolean existByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    // Métodos CRUD para User

    public List<UserDTO> all() {
        userRepository.findAll();
        return userRepository.findAll().stream().map(user -> {
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setFullname(user.getFullname());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRol());
            return dto;
        }).toList();
    }

    public List<User> getByIdNot(Long id) {
        return userRepository.findByIdNot(id);
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User save(UserRequestDTO data) {
        if (data.getUsername() == null || data.getUsername().isEmpty()) {
            throw new IllegalArgumentException("El nombre Username no puede ser nulo o vacío");
        }

        if(data.getFullname() == null || data.getFullname().isEmpty()) {
            throw new IllegalArgumentException("El nombre completo no puede ser nulo o vacío");
        }

        if (data.getEmail() == null || data.getEmail().isEmpty()) {
            throw new IllegalArgumentException("El correo electrónico no puede ser nulo o vacío");
        }
        if (data.getPassword() == null || data.getPassword().isEmpty()) {
            throw new IllegalArgumentException("La contraseña no puede ser nula o vacía");
        }

        User user = new User();
        user.setUsername(data.getUsername());
        user.setEmail(data.getEmail());
        user.setFullname(data.getFullname());
        user.setPassword(data.getPassword());

        if (data.getRolId() != null) {
            Rol rol = rolRepository.findById(data.getRolId())
                .orElseThrow(() -> new RuntimeException("No se encontró el rol con ID: " + data.getRolId()));
            
            user.setRol(rol);
        }

        return userRepository.save(user);
    }

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
            user.setPassword(data.getPassword());
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

