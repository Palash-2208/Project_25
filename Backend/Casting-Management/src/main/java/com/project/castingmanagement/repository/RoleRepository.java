package com.project.castingmanagement.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.castingmanagement.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    @Query("SELECT r FROM Role r WHERE r.postedBy.id = :directorId ORDER BY r.createdAt DESC")
    List<Role> findByDirectorId(@Param("directorId") Long directorId);
    
    @Query("SELECT r FROM Role r WHERE r.deadline > :currentTime ORDER BY r.createdAt DESC")
    List<Role> findActiveRoles(@Param("currentTime") LocalDateTime currentTime);
    
    @Query("SELECT r FROM Role r WHERE r.category = :category AND r.deadline > :currentTime ORDER BY r.createdAt DESC")
    List<Role> findByCategory(@Param("category") Role.RoleCategory category, @Param("currentTime") LocalDateTime currentTime);
    
    @Query("SELECT r FROM Role r WHERE r.deadline > :currentTime AND " +
           "(LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.requirements) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY r.createdAt DESC")
    List<Role> searchRoles(@Param("keyword") String keyword, @Param("currentTime") LocalDateTime currentTime);
}