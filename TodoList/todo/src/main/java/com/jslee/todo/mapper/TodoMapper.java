package com.jslee.todo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.jslee.todo.dto.Todo;

@Mapper
public interface TodoMapper {
    public List<Todo> list();
    public Todo select(int no);
    public int update(Todo todo);
    public int updateAll();
    public int insert(Todo todo);
    public int delete(int no);
    public int deleteAll();
}
