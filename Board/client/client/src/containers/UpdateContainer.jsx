import React, { useEffect, useState } from 'react'
import UpdateForm from '../components/board/UpdateForm'
import * as boards from '../apis/boards'
import { useNavigate } from 'react-router-dom'

const UpdateContainer = ({no}) => {
  // state
  const [ board, setBoard ] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 함수
  // 게시글 조회
  const getBoard = async () => {
    setLoading(true)
    const response = await boards.select(no)
    const data = await response.data      // board
    console.log("data?"+data );
    setBoard(data)
    setLoading(false)
  }

  const navigate = useNavigate()
  // 게시글 수정
  const onUpdate = async (no, title, writer, content) => {
    try {
      const response = await boards.update(no, title, writer, content)
      const status = await response.status
      console.log(`게시글 수정 요청 결과 ${status}`)
      alert('게시글 수정 완료')

      // 수정 완료 후 목록으로 이동
      navigate('/boards')
    } catch (e) {
      console.log(e)
    }
  }

  // 게시글 삭제
  const onRemove = async (no) => {
    try {
      const response = await boards.remove(no)
      const status = await response.status
      console.log(`게시글 삭제 요청 결과 ${status}`)
      alert('게시글 삭제 완료')

      // 삭제 완료 후 목록으로 이동
      navigate('/boards')
    } catch (e) {
      console.log(e)
    }
  }

  // Hook
  useEffect(()=>{
    getBoard()
  }, [])

  return (
    <UpdateForm no={no} 
                board={board} 
                onUpdate={onUpdate} 
                onRemove={onRemove}
                isLoading={isLoading}/>
  )
}

export default UpdateContainer