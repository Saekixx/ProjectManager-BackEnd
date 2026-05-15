package com.project.manager.Controllers;

import org.springframework.web.bind.annotation.RestController;

import com.project.manager.DTO.User.UserDTO;
import com.project.manager.DTO.User.UserRequestDTO;
import com.project.manager.Models.User;
import com.project.manager.Services.UserService;
import com.project.manager.Utils.ApiResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired private UserService userService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> allUser() {
        try {
            List<UserDTO> user = userService.all();

            ApiResponse<List<UserDTO>> response = new ApiResponse<>(
                200,
                "Usuarios obtenidos exitosamente",
                user
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<List<UserDTO>> response = new ApiResponse<>(
                500,
                "Error al obtener los usuarios",
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("notBoss/{id}")
    @PreAuthorize("hasRole('ADMIN', 'COLABORADOR')")
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
    @PreAuthorize("hasRole('ADMIN', 'COLABORADOR')")
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

    @PutMapping("edit/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> editUser(@PathVariable String id, @RequestBody UserRequestDTO entity) {
        try {
            User user = userService.getById(Long.parseLong(id));
            if (user == null) {
                ApiResponse<String> response = new ApiResponse<>(
                    404,
                    "Usuario no encontrado",
                    null
                );
                return ResponseEntity.status(404).body(response);
            }else{
                String result = userService.update(Long.parseLong(id), entity);
                ApiResponse<String> response = new ApiResponse<>(
                    200,
                    result,
                    null
                );
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            ApiResponse<String> response = new ApiResponse<>(
                500,
                "Error al actualizar el usuario",
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }
}
