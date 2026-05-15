package com.project.manager.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.manager.DTO.Project.ProjectCreateDTO;
import com.project.manager.DTO.Project.ProjectDTO;
import com.project.manager.Models.Project;
import com.project.manager.Services.ProjectService;
import com.project.manager.Utils.ApiResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired private ProjectService projectService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> AllProyect() {
        try {
            List<ProjectDTO> projects = projectService.all();

            ApiResponse<List<ProjectDTO>> response = new ApiResponse<>(
                200,
                "Proyectos obtenidos exitosamente",
                projects
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiResponse<List<ProjectDTO>> response = new ApiResponse<>(
                500,
                "Error al obtener los proyectos",
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }
    

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Project>> createProject(@RequestBody ProjectCreateDTO data) {
        try {
            String msg = projectService.save(data);

            ApiResponse<Project> response = new ApiResponse<>(
                201,
                msg,
                null
            );
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            ApiResponse<Project> response = new ApiResponse<>(
                500,
                "Error al crear el proyecto",
                null
            );
            return ResponseEntity.status(500).body(response);
        }
    }
    
}
