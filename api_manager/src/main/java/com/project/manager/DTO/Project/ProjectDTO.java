package com.project.manager.DTO.Project;

import java.util.List;

import com.project.manager.DTO.User.UserDTO;

import lombok.Data;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private UserDTO leaderId;
    private List<UserDTO> memberIds;
    private String created_at;
    private String updated_at;
}
