package com.jslee.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jslee.board.dto.Board;
import com.jslee.board.dto.Files;
import com.jslee.board.service.BoardService;
import com.jslee.board.service.FileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/boards")
public class BoardController {
    
    @Autowired
    private BoardService boardService;

    @Autowired
    private FileService fileService;

    /**
     * 목록
     */
    @GetMapping("")
    public ResponseEntity<?> getAll() {
        try {
            List<Board> boardList = boardService.list();
            return new ResponseEntity<>(boardList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 조회
     * @param no
     * @return
     */
    @GetMapping("/{no}")
    public ResponseEntity<?> getOne(@PathVariable("no") int no) {
        try {
            // 게시글
            Board board = boardService.select(no);
            log.info("board {}",board);

            // 파일 목록
            Files file = new Files();
            file.setParentTable("board");
            file.setParentNo(no);
            List<Files> fileList = fileService.listByParent(file);

            // Map 객체에 fileList, board 모두 담기
            Map<String, Object> response = new HashMap<>();
            response.put("board", board);
            response.put("fileList", fileList);
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 등록
     * @param board
     * @return
     */
    @PostMapping("")
    // public ResponseEntity<?> create(@RequestBody Board board) {  // Content-Type : application/json
    public ResponseEntity<?> create(Board board) {                  // Content-Type : multipart/form-data
        try {
            Board newBoard = boardService.insert(board);
            // log.info("newBoard? {}", newBoard);
            if(newBoard != null)
                return new ResponseEntity<>(newBoard, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 수정
     * @param board
     * @return
     */
    @PutMapping("")
    // public ResponseEntity<?> update(@RequestBody Board board) {
    public ResponseEntity<?> update(Board board) {
        try {
            int result = boardService.update(board);
            if(result > 0)
                return new ResponseEntity<>("Update Result", HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 삭제
     * @param no
     * @return
     */
    @DeleteMapping("/{no}")
    public ResponseEntity<?> destroy(@PathVariable("no") int no) {
        try {
            int result = boardService.delete(no);
            if(result > 0)
                return new ResponseEntity<>("Delete Result", HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
