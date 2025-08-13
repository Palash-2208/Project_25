package com.project.castingmanagement.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.project.castingmanagement.entity.Application;
import com.project.castingmanagement.entity.Role;
import com.project.castingmanagement.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Async
    public void sendApplicationNotification(User director, User actor, Role role) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(director.getEmail());
            message.setSubject("New Application for Role: " + role.getTitle());
            message.setText(String.format(
                "Hello %s,\n\n" +
                "You have received a new application for your role '%s'.\n\n" +
                "Actor Details:\n" +
                "Name: %s\n" +
                "Email: %s\n" +
                "Phone: %s\n\n" +
                "Please log in to your account to review the application.\n\n" +
                "Best regards,\n" +
                "Casting Management Team",
                director.getName(),
                role.getTitle(),
                actor.getName(),
                actor.getEmail(),
                actor.getPhoneNumber() != null ? actor.getPhoneNumber() : "Not provided"
            ));

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send application notification: " + e.getMessage());
        }
    }

    @Async
    public void sendStatusUpdateNotification(User actor, Role role, Application.ApplicationStatus status) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(actor.getEmail());
            message.setSubject("Application Status Update: " + role.getTitle());
            
            String statusMessage = getStatusMessage(status);
            message.setText(String.format(
                "Hello %s,\n\n" +
                "Your application for the role '%s' has been %s.\n\n" +
                "%s\n\n" +
                "Best regards,\n" +
                "Casting Management Team",
                actor.getName(),
                role.getTitle(),
                status.name().toLowerCase(),
                statusMessage
            ));

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send status update notification: " + e.getMessage());
        }
    }

    private String getStatusMessage(Application.ApplicationStatus status) {
        switch (status) {
            case ACCEPTED:
                return "Congratulations! The director is interested in your profile. " +
                       "They will contact you soon for further discussion.";
            case REJECTED:
                return "Unfortunately, your application was not selected for this role. " +
                       "Don't get discouraged - keep applying for other roles!";
            case PENDING:
            default:
                return "Your application is under review. You will be notified once a decision is made.";
        }
    }
}
