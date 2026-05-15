package com.project.manager.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.manager.DTO.Project.ProjectCreateDTO;
import com.project.manager.DTO.Project.ProjectDTO;
import com.project.manager.DTO.User.UserDTO;
import com.project.manager.Models.Project;
import com.project.manager.Models.User;
import com.project.manager.Repositories.ProjectRepository;
import com.project.manager.Repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class ProjectService {
    @Autowired private ProjectRepository projectRepository;
    @Autowired private UserRepository userRepository;

    public List<ProjectDTO> all() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map(project -> {
            ProjectDTO dto = new ProjectDTO();
            dto.setId(project.getId());
            dto.setName(project.getName());
            dto.setDescription(project.getDescription());
            dto.setCreated_at(project.getCreated_at().toString());
            dto.setUpdated_at(project.getUpdated_at() != null ? project.getUpdated_at().toString() : null);

            User leader = project.getLeader();
            if (leader != null) {
                UserDTO leaderDTO = new UserDTO();
                leaderDTO.setId(leader.getId());
                leaderDTO.setFullname(leader.getFullname());
                leaderDTO.setEmail(leader.getEmail());
                leaderDTO.setRole(leader.getRol());
                dto.setLeaderId(leaderDTO);
            }

            List<User> members = project.getMembUsers();
            if (members != null && !members.isEmpty()) {
                List<UserDTO> memberDTOs = members.stream().map(member -> {
                    UserDTO memberDTO = new UserDTO();
                    memberDTO.setId(member.getId());
                    memberDTO.setFullname(member.getFullname());
                    memberDTO.setEmail(member.getEmail());
                    memberDTO.setRole(member.getRol());
                    return memberDTO;
                }).toList();
                dto.setMemberIds(memberDTOs);
            }

            return dto;
        }).toList();
    }

    @Transactional
    public String save(ProjectCreateDTO data) {
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
        projectRepository.save(newProject);
        return "Proyecto creado exitosamente";
    }

    @Transactional
    public String update(Long id, ProjectCreateDTO data) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado con ID: " + id));

        if (data.getName() != null && !data.getName().isEmpty()) {
            project.setName(data.getName());
        }

        if (data.getDescription() != null && !data.getDescription().isEmpty()) {
            project.setDescription(data.getDescription());
        }

        if (data.getLeaderId() != null) {
            User leader = userRepository.findById(data.getLeaderId())
                .orElseThrow(() -> new RuntimeException("Líder no encontrado"));
            project.setLeader(leader);
        }

        if (data.getMemberIds() != null) {
            List<User> members = userRepository.findAllById(data.getMemberIds());
            project.setMembUsers(members);
        }

        projectRepository.save(project);
        return "Proyecto actualizado exitosamente";
    }
}
