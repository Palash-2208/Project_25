package com.project.castingmanagement.repository;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.castingmanagement.entity.FileUpload;
import com.project.castingmanagement.entity.User;
import com.project.castingmanagement.exception.BadRequestException;
import com.project.castingmanagement.service.UserService;
import com.project.castingmanagement.util.FileUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final FileUploadRepository fileUploadRepository;
    private final UserService userService;

    @Value("${file.upload.dir}")
    private String uploadDir;

    @Value("${file.max.size}")
    private long maxFileSize;

    public FileUpload uploadFile(MultipartFile file, Long userId, FileUpload.FileCategory category) {
        if (file.isEmpty()) {
            throw new BadRequestException("File is empty");
        }

        if (file.getSize() > maxFileSize) {
            throw new BadRequestException("File size exceeds maximum limit");
        }

        User user = userService.findById(userId);

        // Validate file type based on category
        validateFileType(file, category);

        try {
            String fileName = FileUtil.saveFile(uploadDir, file);
            String filePath = uploadDir + "/" + fileName;

            FileUpload fileUpload = new FileUpload();
            fileUpload.setFileName(fileName);
            fileUpload.setFilePath(filePath);
            fileUpload.setFileType(file.getContentType());
            fileUpload.setFileSize(file.getSize());
            fileUpload.setCategory(category);
            fileUpload.setUser(user);

            FileUpload savedFile = fileUploadRepository.save(fileUpload);

            // Update user profile URLs based on category
            updateUserProfileUrls(user, savedFile, category);

            return savedFile;
        } catch (IOException e) {
            throw new BadRequestException("Failed to upload file: " + e.getMessage());
        }
    }

    private void validateFileType(MultipartFile file, FileUpload.FileCategory category) {
        switch (category) {
            case PROFILE_IMAGE:
            case PORTFOLIO_IMAGE:
                if (!FileUtil.isImageFile(file)) {
                    throw new BadRequestException("Only image files are allowed for this category");
                }
                break;
            case DEMO_REEL:
                if (!FileUtil.isVideoFile(file)) {
                    throw new BadRequestException("Only video files are allowed for demo reel");
                }
                break;
        }
    }

    private void updateUserProfileUrls(User user, FileUpload fileUpload, FileUpload.FileCategory category) {
        String fileUrl = "/uploads/" + fileUpload.getFileName();
        
        switch (category) {
            case PROFILE_IMAGE:
                userService.updateProfileImage(user.getId(), fileUrl);
                break;
            case DEMO_REEL:
                userService.updateDemoReel(user.getId(), fileUrl);
                break;
        }
    }

    public List<FileUpload> getUserFiles(Long userId) {
        return fileUploadRepository.findByUserId(userId);
    }

    public List<FileUpload> getUserFilesByCategory(Long userId, FileUpload.FileCategory category) {
        return fileUploadRepository.findByUserIdAndCategory(userId, category);
    }

    public void deleteFile(Long fileId, Long userId) {
        FileUpload fileUpload = fileUploadRepository.findById(fileId)
                .orElseThrow(() -> new BadRequestException("File not found"));

        if (!fileUpload.getUser().getId().equals(userId)) {
            throw new BadRequestException("You can only delete your own files");
        }

        fileUploadRepository.delete(fileUpload);
    }
}
