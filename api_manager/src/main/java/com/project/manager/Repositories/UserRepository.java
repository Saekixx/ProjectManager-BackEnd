package com.project.manager.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.manager.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Funcion para obtener todos los usuarios excepto el que se le pasa por id
    List<User> findByIdNot(Long id);
    
    // Funcion para obtener un usuario por su username
    Optional<User> findByUsername(String username);
}
