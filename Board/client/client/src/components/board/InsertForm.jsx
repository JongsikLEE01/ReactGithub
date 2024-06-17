import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const InsertForm = ({ onInsert }) => {

  // state 등록
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')

  // 함수
  // 데이터 넣기
  const handleChangeTitle = (e) =>{
    setTitle(e.target.value)
  }
  const handleChangeWriter = (e) =>{
    setWriter(e.target.value)
  }
  const handleChangeContent = (e) =>{
    setContent(e.target.value)
  }

  const onSubmit = () =>{
    // 유효성 검사
    if(title == null || title == '' ){
      alert('제목을 입력해주세요')
      return
    }

    if(writer == null || writer == '' ){
      alert('작성자를 입력해주세요')
      return
    }

    if(content == null || content == '' ){
      alert('내용을 입력해주세요')
      return
    }
    onInsert(title, writer, content)
  }

  return (
    <div className="container">
      <h1 className="title">게시글 등록</h1>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text" value={title} onChange={handleChangeTitle} />
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text" value={writer} onChange={handleChangeWriter} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>내용</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea cols="40" rows="10" value={content} onChange={handleChangeContent}></textarea>
            </td>
          </tr>
        </tbody>
        <div className="btn-box">
          <Link to="/boards" className='btn'>목록</Link>
          <button className='btn' onClick={onSubmit}>등록</button>
        </div>
      </table>
    </div>
  )
}

export default InsertForm