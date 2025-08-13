package com.project.castingmanagement.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

	@Entity
	@Table(name = "applications", 
	       uniqueConstraints = @UniqueConstraint(columnNames = {"actor_id", "role_id"}))
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public class Application {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "actor_id", nullable = false)
	    private User actor;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "role_id", nullable = false)
	    private Role role;

	    @Enumerated(EnumType.STRING)
	    private ApplicationStatus status = ApplicationStatus.PENDING;

	    @Column(columnDefinition = "TEXT")
	    private String coverLetter;

	    @CreationTimestamp
	    @Column(name = "applied_at")
	    private LocalDateTime appliedAt;

	    @UpdateTimestamp
	    @Column(name = "updated_at")
	    private LocalDateTime updatedAt;

	    public enum ApplicationStatus {
	        PENDING, ACCEPTED, REJECTED
	    }
	}

