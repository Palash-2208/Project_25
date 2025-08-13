package com.project.castingmanagement.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.castingmanagement.dto.ApplicationRequest;
import com.project.castingmanagement.entity.Application;
import com.project.castingmanagement.entity.Role;
import com.project.castingmanagement.entity.User;
import com.project.castingmanagement.exception.BadRequestException;
import com.project.castingmanagement.exception.ResourceNotFoundException;
import com.project.castingmanagement.repository.ApplicationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserService userService;
    private final RoleService roleService;
    private final EmailService emailService;

    public Application applyForRole(ApplicationRequest request, Long actorId) {
        User actor = userService.findById(actorId);
        Role role = roleService.findById(request.getRoleId());

        if (actor.getUserType() != User.UserType.ACTOR) {
            throw new BadRequestException("Only actors can apply for roles");
        }

        if (role.getDeadline().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("This role's deadline has passed");
        }

        if (applicationRepository.existsByActorIdAndRoleId(actorId, request.getRoleId())) {
            throw new BadRequestException("You have already applied for this role");
        }

        Application application = new Application();
        application.setActor(actor);
        application.setRole(role);
        application.setCoverLetter(request.getCoverLetter());
        application.setStatus(Application.ApplicationStatus.PENDING);

        Application savedApplication = applicationRepository.save(application);

        // Send email notification to director
        emailService.sendApplicationNotification(role.getPostedBy(), actor, role);

        return savedApplication;
    }

    public Application findById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
    }

    public List<Application> getApplicationsByActor(Long actorId) {
        return applicationRepository.findByActorId(actorId);
    }

    public List<Application> getApplicationsByRole(Long roleId) {
        return applicationRepository.findByRoleId(roleId);
    }

    public List<Application> getApplicationsByDirector(Long directorId) {
        return applicationRepository.findByDirectorId(directorId);
    }

    public Application updateApplicationStatus(Long applicationId, Application.ApplicationStatus status, Long directorId) {
        Application application = findById(applicationId);
        
        if (!application.getRole().getPostedBy().getId().equals(directorId)) {
            throw new BadRequestException("You can only update applications for your own roles");
        }

        application.setStatus(status);
        Application updatedApplication = applicationRepository.save(application);

        // Send email notification to actor
        emailService.sendStatusUpdateNotification(application.getActor(), application.getRole(), status);

        return updatedApplication;
    }

    public Long getApplicationCount(Long roleId) {
        return applicationRepository.countApplicationsByRoleId(roleId);
    }

    public void deleteApplication(Long applicationId, Long actorId) {
        Application application = findById(applicationId);
        
        if (!application.getActor().getId().equals(actorId)) {
            throw new BadRequestException("You can only delete your own applications");
        }

        applicationRepository.delete(application);
    }
}
