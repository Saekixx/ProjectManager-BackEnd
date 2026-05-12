package com.project.manager.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.manager.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByIdNot(Long id);
}
