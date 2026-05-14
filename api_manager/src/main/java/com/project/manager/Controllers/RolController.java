package com.project.manager.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.project.manager.Models.Rol;
import com.project.manager.Services.RolService;
import com.project.manager.Utils.ApiResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("api/rol")
public class RolController {
    @Autowired private RolService rolService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<Rol>>> allRol() {
        try {
            List<Rol> rol = rolService.all();

            ApiResponse<List<Rol>> response = new ApiResponse<>(
                200,
                "Roles obtenidos exitosamente",
                rol
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<List<Rol>> response = new ApiResponse<>(
                500,
                "Error al obtener los roles",
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Rol>> createRol(@RequestBody Rol data) {
        try {
            Rol rol = rolService.save(data);

            ApiResponse<Rol> response = new ApiResponse<>(
                201,
                "Rol creado exitosamente",
                rol
            );

            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            ApiResponse<Rol> response = new ApiResponse<>(
                500,
                "Error al crear el rol",
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }
    
    
}
