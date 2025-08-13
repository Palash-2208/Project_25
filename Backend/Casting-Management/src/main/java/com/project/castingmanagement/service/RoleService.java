package com.project.castingmanagement.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.castingmanagement.dto.RoleRequest;
import com.project.castingmanagement.entity.Role;
import com.project.castingmanagement.entity.User;
import com.project.castingmanagement.exception.BadRequestException;
import com.project.castingmanagement.exception.ResourceNotFoundException;
import com.project.castingmanagement.repository.RoleRepository;
@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final UserService userService;

    public RoleService(RoleRepository roleRepository, UserService userService) {
		super();
		this.roleRepository = roleRepository;
		this.userService = userService;
	}

	public Role createRole(RoleRequest roleRequest, Long directorId) {
        User director = userService.findById(directorId);
        
        if (director.getUserType() != User.UserType.DIRECTOR) {
            throw new BadRequestException("Only directors can create roles");
        }

        if (roleRequest.getDeadline().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Deadline cannot be in the past");
        }

        Role role = new Role();
        role.setTitle(roleRequest.getTitle());
        role.setDescription(roleRequest.getDescription());
        role.setRequirements(roleRequest.getRequirements());
        role.setDeadline(roleRequest.getDeadline());
        role.setCategory(roleRequest.getCategory());
        role.setPostedBy(director);

        return roleRepository.save(role);
    }

    public Role findById(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
    }

    public List<Role> getAllActiveRoles() {
        return roleRepository.findActiveRoles(LocalDateTime.now());
    }

    public List<Role> getRolesByDirector(Long directorId) {
        return roleRepository.findByDirectorId(directorId);
    }

    public List<Role> getRolesByCategory(Role.RoleCategory category) {
        return roleRepository.findByCategory(category, LocalDateTime.now());
    }

    public List<Role> searchRoles(String keyword) {
        return roleRepository.searchRoles(keyword, LocalDateTime.now());
    }

    public Role updateRole(Long roleId, RoleRequest roleRequest, Long directorId) {
        Role role = findById(roleId);
        
        if (!role.getPostedBy().getId().equals(directorId)) {
            throw new BadRequestException("You can only update your own roles");
        }

        if (roleRequest.getDeadline().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Deadline cannot be in the past");
        }

        role.setTitle(roleRequest.getTitle());
        role.setDescription(roleRequest.getDescription());
        role.setRequirements(roleRequest.getRequirements());
        role.setDeadline(roleRequest.getDeadline());
        role.setCategory(roleRequest.getCategory());

        return roleRepository.save(role);
    }

    public void deleteRole(Long roleId, Long directorId) {
        Role role = findById(roleId);
        
        if (!role.getPostedBy().getId().equals(directorId)) {
            throw new BadRequestException("You can only delete your own roles");
        }

        roleRepository.delete(role);
    }
}