import React from 'react'
import UpdateContainer from '../../containers/UpdateContainer'
import { useParams } from 'react-router-dom';

const Update = () => {
  // 파라미터 가져오기
  const { no } = useParams()
  console.log(`no? ${no}`);

  return (
    <>
      <UpdateContainer no={no}/>
    </>
  )
}

export default Update