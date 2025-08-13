package com.project.castingmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.castingmanagement.entity.FileUpload;

@Repository
public interface FileUploadRepository extends JpaRepository<FileUpload, Long> {
    
    @Query("SELECT f FROM FileUpload f WHERE f.user.id = :userId")
    List<FileUpload> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT f FROM FileUpload f WHERE f.user.id = :userId AND f.category = :category")
    List<FileUpload> findByUserIdAndCategory(@Param("userId") Long userId, 
                                           @Param("category") FileUpload.FileCategory category);
}