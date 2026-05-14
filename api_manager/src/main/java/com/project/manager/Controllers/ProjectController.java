package com.project.manager.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.manager.DTO.Project.ProjectCreateDTO;
import com.project.manager.Models.Project;
import com.project.manager.Services.ProjectService;
import com.project.manager.Utils.ApiResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired private ProjectService projectService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Project>> createProject(@RequestBody ProjectCreateDTO data) {
        try {
            Project project = projectService.save(data);

            ApiResponse<Project> response = new ApiResponse<>(
                201,
                "Proyecto creado exitosamente",
                project
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
