package com.project.manager.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.manager.DTO.UserRequestDTO;
import com.project.manager.Models.Rol;
import com.project.manager.Models.User;
import com.project.manager.Repositories.RolRepository;
import com.project.manager.Repositories.UserRepository;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private RolRepository rolRepository;

    public List<User> all() {
        return userRepository.findAll();
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
}
