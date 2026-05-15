package com.project.manager.DTO.User;

import com.project.manager.Models.Rol;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String fullname;
    private String email;
    private Rol role;
}
