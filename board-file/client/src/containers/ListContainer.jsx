import React, { useEffect, useState } from 'react'
import List from '../components/board/List'
import * as boards from '../apis/boards'

const ListContainer = () => {
  // state
  const [boardList, setBoardList] = useState([])
  const [isLoading, setLoading] = useState(false)

  // 함수
  // 목록
  const getBoardList = async () => {
    // 로딩 시작
    setLoading(true)
    const response = await boards.list()
    const data = await response.data    // boardList 객체
    setBoardList(data)
    // 로딩 끝
    setLoading(false)
  }

  // hook : Mount 호출
  useEffect(()=>{
    getBoardList()
  }, [])
  
  return (
    <>
      {/* Header */}
      <List boardList={boardList} isLoading={isLoading}/>
      {/* footer */}
    </>
  )
}

export default ListContainer