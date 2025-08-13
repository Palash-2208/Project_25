package com.project.castingmanagement.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ApplicationRequest {
    @NotNull(message = "Role ID is required")
    private Long roleId;

    private String coverLetter;
}
