import React from 'react'

const TodoFooter = ({onDeleteAll, updateAll}) => {
  return (
    <div className="footer">
      <div className="item">
        <button className="btn btn-lg"
              onClick={onDeleteAll}>전체 삭제</button>
      </div>
      <div className="item">
        <button className="btn btn-lg"
              onClick={updateAll}>전체 완료</button>
      </div>
    </div>
  )
}

export default TodoFooter