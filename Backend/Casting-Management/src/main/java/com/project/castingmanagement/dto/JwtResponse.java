package com.project.castingmanagement.dto;

import com.project.castingmanagement.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String name;
    private String email;
    private User.UserType userType;

    public JwtResponse(String token, Long id, String name, String email, User.UserType userType) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.userType = userType;
    }
}
