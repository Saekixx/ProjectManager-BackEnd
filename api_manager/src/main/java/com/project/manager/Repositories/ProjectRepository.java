package com.project.manager.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.manager.Models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}
