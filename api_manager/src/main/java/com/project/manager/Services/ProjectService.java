package com.project.manager.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.manager.DTO.Project.ProjectCreateDTO;
import com.project.manager.Models.Project;
import com.project.manager.Models.User;
import com.project.manager.Repositories.ProjectRepository;
import com.project.manager.Repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class ProjectService {
    @Autowired private ProjectRepository projectRepository;
    @Autowired private UserRepository userRepository;

    @Transactional
    public Project save(ProjectCreateDTO data) {
        if (data.getName() == null || data.getName().isEmpty()) {
            throw new IllegalArgumentException("El nombre del proyecto no puede ser nulo o vacío");
        }

        if (data.getDescription() == null || data.getDescription().isEmpty()) {
            throw new IllegalArgumentException("La descripción del proyecto no puede ser nula o vacía");
        }

        Project newProject = new Project();
        newProject.setName(data.getName());
        newProject.setDescription(data.getDescription());
        
        User leader = userRepository.findById(data.getLeaderId())
            .orElseThrow(() -> new RuntimeException("Líder no encontrado"));
        newProject.setLeader(leader);

        if (data.getMemberIds() != null && !data.getMemberIds().isEmpty()) {
            List<User> members = userRepository.findAllById(data.getMemberIds());
            newProject.setMembUsers(members);
        }
        
        return projectRepository.save(newProject);
    }
}
