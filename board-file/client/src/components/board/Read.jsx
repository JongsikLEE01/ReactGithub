import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../board/css/read.module.css'
import { formatDate } from '../../apis/format'
import '../board/css/read.css'
import * as format from '../../apis/format'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Read = ({ board, no, fileList, isLoading, onDownload }) => {

  const handleDownload = (no, fileName) =>{
    // 중간 처리 가능
    onDownload(no, fileName)
  }
  
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
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>번호</td>
                <td>
                  <input type="text" className={styles['form-input']} value={no} readOnly/>
                </td>
              </tr>
              <tr>
                <td>등록 일자</td>
                <td>
                  <input type="text" className={styles['form-input']} value={formatDate(board.regDate)} readOnly/>
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" className={styles['form-input']} value={board.title} readOnly/>
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input type="text" className={styles['form-input']} value={board.writer} readOnly/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {/* <textarea cols="40" className={styles['form-input']} rows="10" value={board.content}></textarea> */}
                  <CKEditor editor={ ClassicEditor }
                    data={ board.content }           // 조회할 데이터 커텐츠 
                    disabled={true}
                    config={{
                        toolbar: [],
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>파일</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  { fileList.map( (file) => (
                      <div className='flex-box' key={file.no}>
                        <div className="item">
                          <img src={`/files/img/${file.no}`} alt={file.fileName} />
                          <span>{file.originName} ({format.byteToUnit(file.fileSize)})</span>
                        </div>

                        <div className="item">
                          <button className='btn'
                                  onClick={() => handleDownload(file.no, file.originName)}>다운로드</button>
                        </div>
                      </div>
                  ))}
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