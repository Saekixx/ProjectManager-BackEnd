package com.project.manager.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.manager.Models.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
}
