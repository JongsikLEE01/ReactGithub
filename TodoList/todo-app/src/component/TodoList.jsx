import { useEffect, useState } from "react";
import TodoItem from "./TodoItem"

const TodoList = ({todoList, onToggle, onDelete}) => {
  return (
    <>
      {/* return 생략 */}
      <ul className="todoList">
        { todoList.map((todo)=>(
          <TodoItem key={todo.no}
                    todo={todo} 
                    onToggle={onToggle}
                    onDelete={onDelete}/>
        ))}

        {/* return 방식 */}
        {/* {todoList.map((todo)=>{
          return(
            <li className="todoItem" key={todo.no}>
              <div className="item">
                <input type="checkbox" name="" id={todo.no} />
                <label htmlFor={todo.no}></label>
                <span>{todo.name}</span>
              </div>
              <div className="item">
                <button className="btn">삭제</button>
              </div>
            </li>
          )
        })}*/}
      </ul>
    </>
  )
}

export default TodoList