import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../board/css/update.module.css'
import { formatDate } from '../../apis/format'
import * as format from '../../apis/format'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// files
import * as filesApi from '../../apis/files'

const UpdateForm = ({ no, board, fileList, onUpdate
                    , onRemove, isLoading, onDownload
                    , onDeleteFile, deleteCheckedFiles }) => { 
  // state 등록
  // 랜더링 될때 넣기 -> Line 47
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState(null)
  const [fileNoList, setFileNoList] = useState([])  // 파일 선택 삭제
  const [checkAll, setCheckAll] = useState([])

  // 함수
  // 데이터 세팅
  const handleChangeTitle = (e) =>{
    setTitle(e.target.value)
  }
  const handleChangeWriter = (e) =>{
    setWriter(e.target.value)
  }
  const handleChangeContent = (e) =>{
    setContent(e.target.value)
  }
  // 파일 핸들러 추가
  const handleChangeFiles = (e) =>{
    setFiles(e.target.files)
  }
  

  // 수정한 데이터 전송
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

    // 파일 업로드
    // Content-Type : application/json -> multipart/form-data
    const formData = new FormData()
    formData.append('no', no)
    formData.append('title', title)
    formData.append('writer', writer)
    formData.append('content', content)

    // 파일 데이터 추가
    if(files){
      for(let i=0; i<files.length; i++){
        const file = files[i]
        formData.append('files', file)
      }
    }

    // 헤더
    const headers = {
      'Content-Type' : 'multipart/form-data'
    }
    
    // onInsert(title, writer, content)  // json
    onUpdate(formData, headers)          // formData
  }

  // uploadPlugin() 함수 정의
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return customUploadAdapter(loader)
    }
  }
  
  // 삭제 전송
  const onSubmitRemove =() =>{
    // window.confirm : DOM을 조작하는 경우 window를 붙여야함
    
    // DOM은 웹 페이지의 요소들을 구조화하여 표현
    // window 객체는 브라우저 창(Window)에 대한 정보와 제어를 제공
    // document 객체는 현재 로드된 문서(Document)에 대한 정보와 제어를 제공
    // JavaScript에서 window 객체를 통해 document 객체에 접근,
    // document 객체를 통해 DOM을 조작하는 방식으로 웹 페이지를 동적으로 제어
    let check = window.confirm('정말 삭제하시겠습니까?') 
    if(!check){
      return
    }
    else
      onRemove(no)  
  }

  // 파일 다운로드
  const handleDownload = (no, fileName) =>{
    // 중간 처리 가능
    onDownload(no, fileName)
  }

  // 파일 삭제
  const handleDeleteFile = (no) =>{
    const check = window.confirm("정말로 삭제하시겠습니까?")
    if(check)
      onDeleteFile(no)
  }

  // 파일 번호 체크
  const checkFileNo = (no)=>{
    let duplicated = false
    for (let i = 0; i < fileNoList.length; i++) {
      const fileNo = fileNoList[i]
      // 중복 : 체크박스 해제 -> 제거
      if(fileNo == no){
        fileNoList.splice(i, 1)
        duplicated = true
      }
    }
    // 중복 X -> 체크박스 지정 -> 추가
    if(!duplicated) fileNoList.push(no)

      console.log(`선택된 파일 번호? ${fileNoList}`);
    setFileNoList(fileNoList)
  }

  // 파일 선택 삭제
  const handelDeleteFiles = () =>{
    const check = window.confirm("정말로 삭제하시겠습니까?")
    if(check){
      deleteCheckedFiles(fileNoList)
    }
    // 파일번호 체크박스 초기화
    setFileNoList([])
  }

  // 파일 전체 선택 -> 삭제
  // 에러 존재
  const fileCheckAll = () =>{
    let checkList = document.getElementsByClassName('check-file')

    if(!checkAll){
      for (let i = 0; i < checkList.length; i++) {
        const check = checkList[i]
        if(!check.checked)
          // 선택된 파일 삭제
          checkFileNo(check.value)
          check.checked = true
      }
      setCheckAll(true)
    }else{
      for (let i = 0; i < checkList.length; i++) {
        const check = checkList[i];
        if(check.checked)
          checkFileNo(check.value)
        check.checked = false
      }
      setCheckAll(false)
    }
  }

  // 마운트 된 후 입력값 세팅
  useEffect(()=>{
    if(board){
      setTitle(board.title)
      setWriter(board.writer)
      setContent(board.content)
    }
  },[board, fileList])
  // 의존성 배열에 board 추가
  // [의존하는 객체]
  // : 지정한 객체가 변환했을 때, 다시 useEffect를 실행

  // uploadPlugin() 함수 정의
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return customUploadAdapter(loader)
    }
  }

  // customUploadAdapter() 함수 정의
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise( (resolve, reject) => {
          const formData = new FormData()
          loader.file.then( async (file) => {
            console.log(file)
            formData.append("parentTable", 'editor')
            formData.append("file", file)

            const headers = {
              'Content-Type' : 'multipart/form-data',
            }

            let response = await filesApi.upload(formData, headers)
            let data = await response.data
            console.log(`data : ${data}`)
            
            let newFile = data
            let newFileNo = newFile.no

            // 이미지 렌더링
            await resolve({
                default: `http://localhost:8080/files/img/${newFileNo}`
            })            
          })
        })
      },
    }
  }

  return (
    <div className="contrainer">
      <h1 className="title">게시글 수정</h1>
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
                  <input type="text" className={styles['form-input-none']} value={no} readOnly/>
                </td>
              </tr>
              <tr>
                <td>등록 일자</td>
                <td>
                  <input type="text" className={styles['form-input-none']} value={formatDate(board.regDate)}/>
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" className={styles['form-input']} value={title} onChange={handleChangeTitle}/>
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input type="text" className={styles['form-input']} value={writer} onChange={handleChangeWriter}/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {/* <textarea cols="50" className={styles['form-input']} rows="10" value={content} onChange={handleChangeContent}></textarea> */}
                  <CKEditor
	                  editor={ ClassicEditor }
	                  config={{
	                      placeholder: "내용을 입력하세요.",
	                      toolbar: {
	                          items: [
	                              'undo', 'redo',
	                              '|', 'heading',
	                              '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
	                              '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
	                              '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
	                              '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
	                              '|', 'mediaEmbed',
	                          ],
	                          shouldNotGroupWhenFull: false
	                      },
	                      editorConfig: {
	                          height: 500,          // Set the desired height in pixels
	                      },
	                      alignment: {
	                          options: ['left', 'center', 'right', 'justify'],
	                      },
                      
	                      extraPlugins: [uploadPlugin]            // 업로드 플러그인
	                  }}
	                  data={board.content}         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
	                  onReady={ editor => {
	                      // You can store the "editor" and use when it is needed.
	                      console.log( 'Editor is ready to use!', editor );
	                  } }
	                  onChange={ ( event, editor ) => {
	                      const data = editor.getData();
	                      console.log( { event, editor, data } );
	                      setContent(data);
	                  } }
	                  onBlur={ ( event, editor ) => {
	                      console.log( 'Blur.', editor );
	                  } }
	                  onFocus={ ( event, editor ) => {
	                      console.log( 'Focus.', editor );
	                  } }
	                />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>파일</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input type="file" name="files" onChange={handleChangeFiles} multiple/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="flex-box">
                    <div className="item">
                      <button className='btn' 
                        onClick={ () => handelDeleteFiles()}>
                          선택 삭제</button>
                    </div>
                    <div className="item">
                      <button className='btn'
                        onClick={ () => fileCheckAll()}
                          >전체 선택</button>
                    </div>
                  </div>
                </td>
              </tr>
              { fileList.map( (file) => (
                <tr key={file.no}>
                  <td colSpan={2}>
                    <div className='flex-box'>
                        <div className="item">
                          <input type="checkbox"
                                className='check-file'
                                onChange={()=>checkFileNo(file.no)}
                                value={file.no}
                                checked={file.checked} />
                          <img src={`/files/img/${file.no}`} alt={file.fileName} />
                          <span>{file.originName} ({format.byteToUnit(file.fileSize)})</span>
                        </div>

                        <div className="item">
                          <button className='btn' onClick={() => handleDownload(file.no, file.originName)}>다운로드</button>
                          <button className="btn" onClick={()=>handleDeleteFile(file.no)}>삭제</button>
                        </div>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
      
      <hr />
      <div className="btn-box">
        <div className="item">
          <Link to="/boards" className="btn">목록</Link>
        </div>
        <div className={styles.item}>
          <button className="btn" onClick={onSubmit}>수정</button>
          <button className="btn" onClick={onSubmitRemove}>삭제</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateForm