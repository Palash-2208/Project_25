package com.project.castingmanagement.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.castingmanagement.entity.FileUpload;
import com.project.castingmanagement.entity.User;
import com.project.castingmanagement.repository.FileUploadService;
import com.project.castingmanagement.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FileUploadController {

    private final FileUploadService fileUploadService;
    private final UserService userService;

    @PostMapping("/upload")
    public ResponseEntity<FileUpload> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") FileUpload.FileCategory category,
            Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        FileUpload uploadedFile = fileUploadService.uploadFile(file, currentUser.getId(), category);
        return ResponseEntity.status(HttpStatus.CREATED).body(uploadedFile);
    }

    @GetMapping("/my-files")
    public ResponseEntity<List<FileUpload>> getMyFiles(Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        List<FileUpload> files = fileUploadService.getUserFiles(currentUser.getId());
        return ResponseEntity.ok(files);
    }

    @GetMapping("/my-files/{category}")
    public ResponseEntity<List<FileUpload>> getMyFilesByCategory(
            @PathVariable FileUpload.FileCategory category,
            Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        List<FileUpload> files = fileUploadService.getUserFilesByCategory(currentUser.getId(), category);
        return ResponseEntity.ok(files);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id, Authentication authentication) {
        User currentUser = userService.findByEmail(authentication.getName());
        fileUploadService.deleteFile(id, currentUser.getId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get("uploads").resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}