# ReactGithub
ReactGithub입니다

## Node 프로젝트 .gitinore
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
