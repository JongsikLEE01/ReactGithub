package com.jslee.todo.service;

import java.util.List;

import com.jslee.todo.dto.Todo;

public interface TodoService {
    public List<Todo> list() throws Exception;
    public Todo select(int no) throws Exception;
    public int update(Todo todo) throws Exception;
    public Todo insert(Todo todo) throws Exception;
    public int delete(int no) throws Exception;
    public int updateAll() throws Exception;
    public int deleteAll() throws Exception;
}
