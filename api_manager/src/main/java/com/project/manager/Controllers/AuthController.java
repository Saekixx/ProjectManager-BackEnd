package com.project.manager.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.manager.DTO.User.LoginUser;
import com.project.manager.DTO.User.UserRequestDTO;
import com.project.manager.Models.User;
import com.project.manager.Services.AuthService;
import com.project.manager.Utils.ApiResponse;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    @Autowired AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody LoginUser data, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ApiResponse<String> response = new ApiResponse<>(
                400,
                "Datos de inicio de sesión inválidos",
                null
            );
            return ResponseEntity.status(400).body(response);
        }

        try{
            String token = authService.login(data.getEmail(), data.getPassword());

            ApiResponse<String> response = new ApiResponse<>(
                200,
                "Inicio de sesión exitoso",
                token
            );

            return ResponseEntity.ok(response);
        }catch(Exception e){
            ApiResponse<String> response = new ApiResponse<>(
                500,
                e.getMessage(),
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody UserRequestDTO data) {
        try {
            User user = authService.register(data);

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
