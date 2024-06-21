package com.jslee.board.controller;

import java.io.File;
import java.io.FileInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jslee.board.dto.Files;
import com.jslee.board.service.FileService;
import com.jslee.board.utils.MediaUtil;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

/**
 * 📄 파일
 * 1. 파일 업로드
 * 2. 파일 다운로드
 * 3. 이미지 썸네일
 * 4. 파일 삭제
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/files")
public class FileController {
    
    @Autowired
    private FileService fileService;

    // ResourceLoader : 프로젝트 내의 자원을 접근하는 객체
    @Autowired
    private ResourceLoader resourceLoader;

    /**
     * sp-post
     * 파일 업로드
     * @param file
     * @return
     */
    @PostMapping("")
    // public ResponseEntity<?> create(@RequestBody Files file) {
    public ResponseEntity<?> create(Files file) {
        try {
            Files uploadedFile = fileService.upload(file);

            return new ResponseEntity<>(uploadedFile, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 파일 다운로드
     * @param no
     * @param response
     * @throws Exception
     */
    @GetMapping("/{no}")
    public void fileDownload(@PathVariable("no") int no, HttpServletResponse response) throws Exception{
        fileService.download(no, response);
    }


    /**
     * 이미지 썸네일
     * @param no
     * @return
     * @throws Exception
     */
    @GetMapping("/img/{no}")
    public void thumbnail(@PathVariable("no") Integer no, HttpServletResponse response) throws Exception{
        if(no == null) return;
        // 1. 파일 번호로 파일 조회
        Files file = fileService.select(no);

        // 2. 파일 정보에서 파일 경로 추출
        String filePath = file.getFilePath();
            
        // 3. 파일 시스템에서 이미지 파일 입력
        File imgFile = null;
        boolean existFile = new File(filePath).exists();    // 파일 존재 유무 확인
        Resource resource = resourceLoader.getResource(filePath);
        String noImagePath = "classpath:static/img/no-image.jpg";

        // 이미지 파일이 없는 경우
        if(file == null || !existFile){
            // 기본 이미지를 프로젝트 내부의 no-image로 지정
            imgFile = resource.getFile();
        }
        // 이미지 파일이 있는 경우
        else{
            imgFile = new File(filePath);
        }

        // 4. 이미지의 확장자를 확인해서 Content-Type 응답헤더 지정
        //   4-1. 확장자 확인
        String ext = filePath.substring(filePath.lastIndexOf(".") + 1 );
        // MediaType : Content-Type 중, image, aduio, video 등
        MediaType mediaType = MediaUtil.getMediaType(ext);

        //   4-2. 컨텐츠 타입 지정
        // 이미지 파일이 아닌 경우 -> no-image 처리
        if(mediaType == null){
            mediaType = MediaType.IMAGE_PNG;
            imgFile = resource.getFile();
        }
        response.setContentType(mediaType.toString());
        
        // 5. 이미지 파일 응답
        FileInputStream fis = new FileInputStream(imgFile);
        ServletOutputStream sos = response.getOutputStream();
        FileCopyUtils.copy(fis, sos);
    }
    
    /**
     * 파일 삭제
     * @param no
     * @return
     */
    @DeleteMapping("/{no}")
    public ResponseEntity<?> delete(@PathVariable("no") Integer no) {
        try {
            if(no == null)
                return new ResponseEntity<>("잘못된 요청입니다...",HttpStatus.BAD_REQUEST);

            int result = fileService.delete(no);
            if(result > 0)
                return new ResponseEntity<>("파일 삭제 성공...", HttpStatus.OK);
            else
                return new ResponseEntity<>("파일 삭제 실패...",HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("파일 삭제 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 파일 선택 삭제
     * @param no
     * @return
     */
    @DeleteMapping("")
    public ResponseEntity<?> deleteFile(@RequestParam("no") String no) {
        log.info("no?? {}",no);
        try {
            if(no == null)
                return new ResponseEntity<>("잘못된 요청입니다...",HttpStatus.BAD_REQUEST);

            int result = fileService.deleteFiles(no);
            if(result > 0)
                return new ResponseEntity<>("파일 삭제 성공...", HttpStatus.OK);
            else
                return new ResponseEntity<>("파일 삭제-- 실패...",HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("파일 삭제- 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
