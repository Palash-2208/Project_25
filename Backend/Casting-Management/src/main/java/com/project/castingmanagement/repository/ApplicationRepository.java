package com.project.castingmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.castingmanagement.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
    @Query("SELECT a FROM Application a WHERE a.actor.id = :actorId ORDER BY a.appliedAt DESC")
    List<Application> findByActorId(@Param("actorId") Long actorId);
    
    @Query("SELECT a FROM Application a WHERE a.role.id = :roleId ORDER BY a.appliedAt DESC")
    List<Application> findByRoleId(@Param("roleId") Long roleId);
    
    @Query("SELECT a FROM Application a WHERE a.role.postedBy.id = :directorId ORDER BY a.appliedAt DESC")
    List<Application> findByDirectorId(@Param("directorId") Long directorId);
    
    Optional<Application> findByActorIdAndRoleId(Long actorId, Long roleId);
    
    boolean existsByActorIdAndRoleId(Long actorId, Long roleId);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.role.id = :roleId")
    Long countApplicationsByRoleId(@Param("roleId") Long roleId);
}