import { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'

const TodoContainer = () => {
  // state 정의
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState([])

  // Hook
  // 목록 요청 - [GET] 비동기 전송
  useEffect(()=>{
    fetch('http://localhost:8080/todo')
    .then((response) => response.json() )
    .then((data)=> {
      setTodoList(data)
    })
    .catch((e) => console.log(e))
  }, [])

  // 리스트 가져오기 -> 로드 에러 X
  const getList=()=>{
    fetch('http://localhost:8080/todo')
    .then((response) => response.json() )
    .then((data)=> {setTodoList(data)})
    .catch((e) => console.log(e))
  }

  // TodoItem 체크 박스 토글
  // 할 일 수정 - [PUT] 비동기 전송
  const onToggle = (todo) => {
    
    const data ={
      no      : todo.no,
      name    : todo.name,
      status  : todo.status ? 0 : 1,    // 토글 뒤집기
      regDate : todo.regDate,
      updDate : todo.updDate,
    }

    const init = {
      // 전송 메소드 설정
      method : 'PUT',
      // 헤더에 컨텐츠 타입 설정
      headers: { 'Content-Type': 'application/json', },
      // 바디에 데이터 담기
      body: JSON.stringify(data)
    }

    // 할일 수정 데이터 보내기
    fetch('http://localhost:8080/todo',init)
      // 데이터 전송
      .then( ( response ) => response.json() )
      // 새로운 데이터 로드
      .then( ( data ) => setTodoList([data, ...todoList]) )
      .catch( (error) => console.log(error) )

    // 해당 번호만 데이터 변경
    const updateTodoList = todoList.map((item)=>{
      // status: !item.status 바뀐 status만 변경
      return item.no == todo.no ? {...item, status: !item.status} : item
    })

    setTodoList(updateTodoList)
    // getList()
  }

  // 할일 전체 수정 - [PUT] 비동기 전송
  const updateAll = ()=>{
    const data = {
      status: 1    // 완료 여부(미완료-0,완료-1)
    }
    const init = {
      // 전송 메소드 설정
      method : 'PUT',
      // 헤더에 컨텐츠 타입 설정
      headers: { 'Content-Type': 'application/json', },
      // 바디에 데이터 담기
      body: JSON.stringify(data)
    }

    // 데이터 전송
    fetch('http://localhost:8080/todo/all',init)
      // 데이터 전송
      .then( ( response ) => response.json() )
      // 새로운 데이터 로드
      .then( ( data ) => setTodoList([data, ...todoList]) )
      .catch( (error) => console.log(error) )

      const updateTodoList = todoList.map((item)=>{
          // status: !item.status 바뀐 status만 변경
          return {...item, status: true}
      })
      // 정렬

    // alert('전체 완료 되었습니다.')
    setTodoList(updateTodoList)
    // getList()
  } 


  // 할일 삭제 - [DELETE] 비동기 전송
  const onDelete = (no) => {
    // 메소드 설정
    const init = {
      method: 'DELETE',
    }

    // 할일 삭제
    // fetch(`전송할 데이터 주소`, 전송할 데이터)
    fetch(`http://localhost:8080/todo/${no}`, init)
      .then( ( response ) => response.text() )
      // 삭제된 데이터 로그에 출력
      .then( ( data ) => console.log(data) )
      .catch( (error) => console.log(error) )

    // 삭제된 할일 항목 제거
    // JS 함수 - filter : 배열 요소를 선회하며 콜백 함수를 사용해
    //                    원하는 조건에 따라 필터링하는 함수
    const updatedTodoList = todoList.filter( (todo) => todo.no != no )

    // 데이터 목록 다시 출력
    setTodoList( updatedTodoList )
    // getList()
  }

  // 할일 전체 삭제
  const onDeleteAll= () =>{
    // 메소드 설정
    const init = {
      method: 'DELETE',
    }

    // 할일 삭제
    // fetch(`전송할 데이터 주소`, 전송할 데이터)
    fetch(`http://localhost:8080/todo`, init)
      .then( ( response ) => response.text() )
      // 삭제된 데이터 로그에 출력
      .then( ( data ) => console.log(data) )
      .catch( (error) => console.log(error) )

    // 데이터 목록 다시 출력
    // alert('전체 삭제 되었습니다.')
    // 빈 배열 반환
    setTodoList([])
    // getList()
  }


  // 할일 입력 이벤트
  const onChange = (e) => {
    setInput(e.target.value)
  }

  // 할일 등록 - [POST] 비동기 전송
  const onSubmit = () => {
    console.log('할일 : ' + input)
    // input 공백 체크
    if( input == '' ) {
      alert('할 일을 입력해주세요')
      return
    }

    const data = {
      name: input == '' ? '제목없음' : input,  // 할일 제목
      status: 0,                              // 완료 여부(미완료-0,완료-1)
    }
    const init = {
      // 전송 메소드 설정
      method : 'POST',
      // 헤더에 컨텐츠 타입 설정
      headers: {'Content-Type': 'application/json', },
      // 바디에 데이터 담기
      body: JSON.stringify(data)
    }

    // 데이터 전송
    fetch('http://localhost:8080/todo',init)
      // 데이터 전송
      .then( ( response ) => response.json() )
      // 새로운 데이터 로드
      .then( ( data ) => setTodoList([data, ...todoList]) )
      .catch( (error) => console.log(error) )

    setInput('')
    getList()
  }

  return (
    <>
      <div className="container">
          <TodoHeader/>
          <TodoInput input={input} 
                     onChange={onChange}
                     onSubmit={onSubmit}/>
          <TodoList todoList={todoList} 
                    onToggle={onToggle}
                    onDelete={onDelete}/>
          <TodoFooter onDeleteAll={onDeleteAll} 
                      updateAll={updateAll}/>
      </div>
    </>
  )
}

export default TodoContainer