package com.project.castingmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.castingmanagement.dto.ApplicationRequest;
import com.project.castingmanagement.entity.Application;
import com.project.castingmanagement.entity.User;
import com.project.castingmanagement.service.ApplicationService;
import com.project.castingmanagement.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Application> applyForRole(
            @Valid @RequestBody ApplicationRequest request,
            Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        Application application = applicationService.applyForRole(request, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(application);
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<Application>> getMyApplications(Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        List<Application> applications = applicationService.getApplicationsByActor(currentUser.getId());
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<Application>> getApplicationsByRole(@PathVariable Long roleId) {
        List<Application> applications = applicationService.getApplicationsByRole(roleId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/my-role-applications")
    public ResponseEntity<List<Application>> getApplicationsForMyRoles(Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        List<Application> applications = applicationService.getApplicationsByDirector(currentUser.getId());
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam Application.ApplicationStatus status,
            Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        Application application = applicationService.updateApplicationStatus(id, status, currentUser.getId());
        return ResponseEntity.ok(application);
    }

    @GetMapping("/role/{roleId}/count")
    public ResponseEntity<Long> getApplicationCount(@PathVariable Long roleId) {
        Long count = applicationService.getApplicationCount(roleId);
        return ResponseEntity.ok(count);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(@PathVariable Long id, Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        applicationService.deleteApplication(id, currentUser.getId());
        return ResponseEntity.ok().build();
    }
}