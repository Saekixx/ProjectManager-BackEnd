package com.project.manager.DTO.Project;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProjectCreateDTO {
    private String name;
    private String description;
    private Long leaderId;
    private List<Long> memberIds;
}
