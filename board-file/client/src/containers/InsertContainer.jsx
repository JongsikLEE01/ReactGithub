import React from 'react'
import InsertForm from '../components/board/InsertForm'
import * as boards from '../apis/boards'
import { useNavigate } from 'react-router-dom'

const InsertContainer = () => {
  const navigate = useNavigate()

  // 함수
  // 게시글 등록
  // const onInsert = async (title, writer, content) => {
  const onInsert = async (formData, headers) => {
    try {
      // const response = await boards.insert(title, writer, content)
      const response = await boards.insert(formData, headers)
      const status = await response.status
      console.log(`게시글 등록 요청 결과 ${status}`)
      alert('게시글 등록 완료')

      // 등록 완료 후 목록으로 이동
      navigate('/boards')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {/* 게시글 등록 */}
      <InsertForm onInsert={onInsert}/>
    </>
  )
}

export default InsertContainer