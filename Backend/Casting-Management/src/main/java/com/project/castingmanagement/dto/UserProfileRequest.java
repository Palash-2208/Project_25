package com.project.castingmanagement.dto;


import lombok.Data;

@Data
public class UserProfileRequest {
    private String name;
    private Integer age;
    private String experience;
    private String skills;
    private String phoneNumber;
}