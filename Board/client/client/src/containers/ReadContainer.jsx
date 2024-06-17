import React, { useEffect, useState } from 'react'
import Read from '../components/board/Read'
import * as boards from '../apis/boards'

const ReadContainer = ({ no }) => {
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
    setLoading(true)
  }

  // Hook
  useEffect(()=>{
    getBoard()
  }, [])

  return (
    <>
      {/* 게시글 조회 */}
      <Read no={no} 
            board={board}
            isLoading={isLoading}/>
    </>
  )
}

export default ReadContainer