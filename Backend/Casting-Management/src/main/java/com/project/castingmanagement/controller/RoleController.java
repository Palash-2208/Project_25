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

import com.project.castingmanagement.dto.RoleRequest;
import com.project.castingmanagement.entity.Role;
import com.project.castingmanagement.entity.User;
import com.project.castingmanagement.service.RoleService;
import com.project.castingmanagement.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RoleController {

    private final RoleService roleService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Role> createRole(
            @Valid @RequestBody RoleRequest roleRequest,
            Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        Role role = roleService.createRole(roleRequest, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(role);
    }

    @GetMapping
    public ResponseEntity<List<Role>> getAllActiveRoles() {
        List<Role> roles = roleService.getAllActiveRoles();
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable Long id) {
        Role role = roleService.findById(id);
        return ResponseEntity.ok(role);
    }

    @GetMapping("/my-roles")
    public ResponseEntity<List<Role>> getMyRoles(Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        List<Role> roles = roleService.getRolesByDirector(currentUser.getId());
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Role>> getRolesByCategory(@PathVariable Role.RoleCategory category) {
        List<Role> roles = roleService.getRolesByCategory(category);
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Role>> searchRoles(@RequestParam String keyword) {
        List<Role> roles = roleService.searchRoles(keyword);
        return ResponseEntity.ok(roles);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(
            @PathVariable Long id,
            @Valid @RequestBody RoleRequest roleRequest,
            Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        Role role = roleService.updateRole(id, roleRequest, currentUser.getId());
        return ResponseEntity.ok(role);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Long id, Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        roleService.deleteRole(id, currentUser.getId());
        return ResponseEntity.ok().build();
    }
}