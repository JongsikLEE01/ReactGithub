import React from 'react'
import { Link } from 'react-router-dom'

const Read = ({ board, no, isLoading }) => {
  console.log(board);

  return (
    <div className="contrainer">
      <h1 className="title">게시글 조회</h1>
      <h3>번호 : {no}</h3>
      <hr />

      {
        // 로딩중인 경우
        isLoading && 
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
      {
        // 로딩이 끝난 경우
        !isLoading && board && (
          <table>
          <tbody>
            <tr>
              <td>번호</td>
              <td>
                <input type="text" value={no} readOnly/>
              </td>
            </tr>
            <tr>
              <td>등록 일자</td>
              <td>
                <input type="text" value={board.regDate} readOnly/>
              </td>
            </tr>
            <tr>
              <td>제목</td>
              <td>
                <input type="text" value={board.title} readOnly/>
              </td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>
                <input type="text" value={board.writer} readOnly/>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>내용</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <textarea cols="40" rows="10" value={board.content}></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        )
      }
     
      <hr />
      <div className="btn-box">
        <Link to="/boards" className="btn">목록</Link>
        <Link to={`/boards/update/${no}`} className="btn">수정</Link>
      </div>
    </div>
  )
}

export default Read