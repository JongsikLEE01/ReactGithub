# Board (SpringBoot + React)

## BackEnd
- SpringBoot
- CRUD 작업
    - board 테이블 생성
    - Board.java DTO 생성
    - BoardMapper.xml
    - BoardMapper.java
    - BoardService.java
    - BoardServiceImpl.java
    - BoardController.java

## FrontEnd
- React
- containers 생성
    - 게시글 목록 -> ListContainer
    - 게시글 등록 -> InsertContainer
    - 게시글 조회 -> ReadContainer
    - 게시글 수정 -> UpadteContainer
- components 생성
    - board(컴포넌트)
        - List
        - Read
        - InsertForm
        - UpdateForm
    - pages(화면)
        - board
            - List
            - Read
            - Insert
            - Update
        - Home
    - Apis
        - boards.js

<hr>

## axios 라이브러리

### axios 설치
```
    npm install axios
```

### axios 사용 방법
- import
- GET
- POST
- PUT
- DELETE

### import
```
    import axios from 'axios';
```

### GET
```
    axios.get("경로")
```

### POST
```
    axios.post("경로", {데이터})
```

### PUT
```
    axios.put("경로", {데이터})
```

### DELETE
```
    axios.delete("경로")
```
