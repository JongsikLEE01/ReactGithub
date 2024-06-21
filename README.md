# ReactGithub
TodoList와 간단한 게시판을 만들었습니다

## TodoList
FETCH, Hook, State를 이해하고 공부하기 위해서 제작한 TodoList입니다 삽입, 한 일 체크, 삭제, 전체 삭제와 전체 완료를 구현했습니다<br>
### 실행화면
![TodoList](https://github.com/JongsikLEE01/ReactGithub/assets/137877490/708ce921-3e5e-4a95-a5e6-85f283206b17)

<hr>
<br>

## board-file
SpringBoot와 React를 이용해 axios를 사용해서 Rest API를 이해하고 공부하기 위해서 제작한 게시판입니다.
게시글 CRUD를 만들고 파일 CRUD를 작성했습니다. 게시글의 내용은 ckeditor을 이용해 제작했습니다.
자세한 제작 과정과 내용은 블로그에 올려두었습니다.

<a href="https://screeching-bench-b7a.notion.site/CRUD-36faedbcc18e452f9a02226127ba20e9">블로그 바로가기 🚀</a>

### 목록 화면
![목록](https://github.com/JongsikLEE01/ReactGithub/assets/137877490/566dde24-92f7-411a-b44b-ed38bddf3c23)

### 조회 화면
![조회](https://github.com/JongsikLEE01/ReactGithub/assets/137877490/92a33697-40ff-45ee-ae38-38ad372bcadc)

### 등록 화면
![등록](https://github.com/JongsikLEE01/ReactGithub/assets/137877490/3c8c6b4a-1d19-4a66-bb75-be1f80efdd42)

### 수정 화면
![수정](https://github.com/JongsikLEE01/ReactGithub/assets/137877490/f976e1ad-9816-4617-b7f7-455971a2850f)

### 삭제 화면
![삭제](https://github.com/JongsikLEE01/ReactGithub/assets/137877490/75f03625-9e77-4e63-87b7-6ed053b5cd0e)


<br><br><br>
---
# Node 프로젝트 .gitinore
Node로 만든 프로젝트는 node_modiles 때문에 많은 변경 사항이 발생, npm install 후 2K, 4K 수로 엄청 많은 변경 사항 카운트가 뜸
하지만 이걸 모두 github에 올릴 필요없이 package.json에 의존성이 있으니 clone 또는 pull을 받고 npm install을 하면 됌

## github에서 .gitihnore 만들기
1. Add file > Create new file
2. .gitihnore
3. Choose .gitihnore template :Node
4. commit changes

## .gitihnore 생성 후 푸시
1. .git 폴더와 같은 위치에 .gitihnore파일 생성
2. 제외할 파일에 대한 패턴을 작성
3. git 캐시 삭제 후 push

### .git 폴더와 같은 위치에 .gitihnore파일 생성
```
  .gitignore
```

### 제외할 파일에 대한 패턴을 작성
```
  node_modules/
  logs
```
이렇게만 해 놓아도 node_modules/ 아래 파일들은 변경 사항 감지 대상에서 제외

### git 캐시 삭제 후 push
* 캐시 삭제
  ```
  git rm -r --cached .
  ```
* 스테이징
  ```
  git add .
  ```
* 커밋
  ```
  git commit -m '메시지'
  ```
* 푸쉬
  ```
  git push
  ```
