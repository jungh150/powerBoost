# 이화여대 powerBoost Study - 게시판 api

## 1주차: DB 없이 post CRUD api 만들기

### 주요기능
#### 글 작성
POST request를 통해 글을 작성할 수 있다.
```
POST http://localhost:3000/posts
Content-Type: application/json

{
    "title": "힘들지만...",
    "content": "거친세상에뛰어든건나니까암오케"
}
```
####  글 수정
PATCH request를 통해 글을 수정할 수 있다.
```
PATCH http://localhost:3000/posts/5
Content-Type: application/json

{
    "content": "거친세상에뛰어든건나니까암오케..사실안괜찮음"
}
```
#### 글 삭제
DELETE request를 통해 글을 삭제할 수 있다.
```
DELETE http://localhost:3000/posts/5
```
#### 특정 글 조회
GET request를 통해 특정 id의 글을 조회할 수 있다.
```
GET http://localhost:3000/posts/1
```
#### 전체 글 조회
GET request를 통해 전체 글을 조회할 수 있다.
```
GET http://localhost:3000/posts
```
#### 글에 좋아요 달기
PATCH request를 통해 글에 좋아요를 달 수 있다.
```
PATCH http://localhost:3000/posts/5
Content-Type: application/json

{
    "isliked": true
}
```
#### 글에 댓글 달기
PATCH request를 통해 글에 댓글을 달 수 있다.
```
PATCH http://localhost:3000/comments/1
Content-Type: application/json

{
    "comment": "마라탕"
}
```

### 내용 정리
#### 개발 환경 세팅
express 패키지를 설치, nodemon 패키지 설치
```
npm install express
npm install --save-dev nodemon
```
package.json 파일에 type 필드를 module로 설정
```
{
  "dependencies": {
    ...
  },
  "devDependencies": {
    ...
  },
  "type": "module"
}
```
#### express의 라우팅
1. GET: 서버에서 데이터를 가져올 때 사용
```
app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});
```
2. POST: 서버로 데이터를 보낼 때 사용
```
app.post('/submit', (req, res) => {
  const data = req.body;
  res.send(`Data received: ${JSON.stringify(data)}`);
});
```
3. PATCH: 서버의 리소스 일부를 업데이트할 때 사용
(PUT: 서버의 리소스 전체를 업데이트할 때 사용)
```
app.patch('/user/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  res.send(`User ${userId} updated with data: ${JSON.stringify(updatedData)}`);
});
```
4. DELETE: 서버의 리소스를 삭제할 때 사용
```
app.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ${userId} deleted`);
});
```
#### JSON 데이터를 자바스크립트 객체로 변환 (파싱)
request의 body는 JSON 데이터로 전달된다.
이를 자바스크립트의 객체로 변환(파싱)을 하기 위해서 app.js에 다음과 같은 코드가 필요하다.
```
app.use(express.json());
```

### 회고
이번 주차 과제는 강의 영상에서 다룬 부분이 많아서 어려움이 많지는 않았다. 그러나 댓글을 어떤 식으로 저장하고 가져오고 수정할 것인지가 조금 고민이 되긴 했다. 나는 post 객체 안에 comment라는 배열 속성을 만들어서 관리했다.

## 2주차: DB 연동 + 회원가입/로그인/로그아웃 기능 구현

### 주요 기능
#### 회원가입

#### 로그인

#### 로그아웃

#### 전체 글 조회

#### 특정 글 조회

#### 글 작성

#### 글 수정

#### 글에 좋아요 누르기

#### 글에 좋아요 취소하기

#### 글 삭제

#### 특정 글의 댓글 조회

#### 댓글 작성

#### 댓글 수정

#### 댓글 삭제

### 내용 정리
#### migration
schema.prisma 파일에 변경 사항이 있을 때마다 migration을 해주어야 한다.
```
npx prisma migrate dev
```