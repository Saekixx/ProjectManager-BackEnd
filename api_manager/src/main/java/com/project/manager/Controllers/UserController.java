package com.project.manager.Controllers;

import org.springframework.web.bind.annotation.RestController;

import com.project.manager.DTO.UserRequestDTO;
import com.project.manager.Models.User;
import com.project.manager.Services.UserService;
import com.project.manager.Utils.ApiResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired private UserService userService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<User>>> allUser() {
        try {
            List<User> user = userService.all();

            ApiResponse<List<User>> response = new ApiResponse<>(
                200,
                "Usuarios obtenidos exitosamente",
                user
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<List<User>> response = new ApiResponse<>(
                500,
                "Error al obtener los usuarios",
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("notBoss/{id}")
    public ResponseEntity<ApiResponse<List<User>>> getAvailableCollaborators(@PathVariable Long id) {
        try {
            List<User> users = userService.getByIdNot(id);

            ApiResponse<List<User>> response = new ApiResponse<>(
                200,
                "Colaboradores disponibles obtenidos exitosamente",
                users
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<List<User>> response = new ApiResponse<>(
                500,
                "Error al obtener los colaboradores disponibles",
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getById(id);

            if (user == null) {
                ApiResponse<User> response = new ApiResponse<>(
                    404,
                    "Usuario no encontrado",
                    null
                );
                return ResponseEntity.status(404).body(response);
            }

            ApiResponse<User> response = new ApiResponse<>(
                200,
                "Usuario obtenido exitosamente",
                user
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<User> response = new ApiResponse<>(
                500,
                "Error al obtener el usuario",
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody UserRequestDTO data) {
        try {
            User user = userService.save(data);

            ApiResponse<User> response = new ApiResponse<>(
                201,
                "Usuario creado exitosamente",
                user
            );

            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            ApiResponse<User> response = new ApiResponse<>(
                500,
                "Error al crear el usuario: " + e.getMessage(),
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }
    
    
}
