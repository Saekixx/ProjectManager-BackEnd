package com.project.manager.DTO;

import lombok.Data;

@Data
public class  UserRequestDTO {
    private String username;
    private String password;
    private String fullname;
    private String email;
    private Long rolId;
}
