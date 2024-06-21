package com.jslee.todo.controller;

import java.util.List;

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

import com.jslee.todo.dto.Todo;
import com.jslee.todo.service.TodoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoService todoservice;
    
    /**
     * 목록 가져오기 - GET
     * @return
     */
    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            List<Todo> todoList = todoservice.list();
            return new ResponseEntity<>(todoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 목록 조회하기 - GET
     */
    @GetMapping("/{no}")
    public ResponseEntity<?> selectr(@PathVariable("no") int no) {
        try {
            Todo todo = todoservice.select(no);
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 할일 등록 - POST
     * @param todo
     * @return
     */
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Todo todo) {
        try {
            Todo newTodo = todoservice.insert(todo);
            if(newTodo != null)
                return new ResponseEntity<>(newTodo, HttpStatus.OK);
            else
                return new ResponseEntity<>(null ,HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null ,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 할일 수정 - PUT
     * @param todo
     * @return
     */
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Todo todo) {
        log.info("todo {}", todo);
        try {
            int result = todoservice.update(todo);
            if(result > 0)
                return new ResponseEntity<>("수정 성공...", HttpStatus.OK);
            else
                return new ResponseEntity<>("수정 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("수정 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 할 일 삭제 - DELETE
     * @param no
     * @return
     */
    @DeleteMapping("/{no}")
    public ResponseEntity<?> destroy(@PathVariable("no") int no) {
        try {
            int result = todoservice.delete(no);
            if(result > 0)
                return new ResponseEntity<>("삭제 성공...", HttpStatus.OK);
            else
                return new ResponseEntity<>("삭제 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("삭제 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 전체 할일 수정 - PUT
     * @return
     */
    @PutMapping("/all")
    public ResponseEntity<?> updateAll() {
        try {
            int result = todoservice.updateAll();
            if(result > 0)
                return new ResponseEntity<>("전체 수정 성공...", HttpStatus.OK);
            else
                return new ResponseEntity<>("전체 수정 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("전체 수정 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 전체 삭제 - DELETE
     * @return
     */
    @DeleteMapping("")
    public ResponseEntity<?> deleteAll() {
        try {
            int result = todoservice.deleteAll();
            if(result > 0)
                return new ResponseEntity<>("전체 삭제 성공...", HttpStatus.OK);
            else
                return new ResponseEntity<>("전체 삭제 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("전체 삭제 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
