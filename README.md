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
request
```
POST http://localhost:3000/register
Content-Type: application/json

{
    "id": "jungh",
    "password": "1234"
}
```
response
```
{
    "id": "jungh",
    "password": "$2a$10$jA7Xw6U7b28BAbhrRi9Gb.AaT6/OuHaW3VhK1JFga1VkBpFP9ldZ.",
    "createdAt": "2024-07-17T22:00:46.218Z",
    "updatedAt": "2024-07-17T22:00:46.218Z"
}
```
#### 로그인
request
```
POST http://localhost:3000/login
Content-Type: application/json

{
    "id": "jungh",
    "password": "1234"
}
```
response
```
{
    "message": "Login Success"
}
```
#### 로그아웃
request
```
POST http://localhost:3000/logout
```
response
```
{
    "message": "Logout Success"
}
```
#### 전체 글 조회
request
```
GET http://localhost:3000/posts
```
response
```
[
    {
        "id": "231e92b7-1186-4112-b013-6da658368916",
        "title": "고양이...",
        "content": "나만 고양이 없어 흑흑흑",
        "userId": "catlover",
        "like": 0,
        "createdAt": "2024-07-17T22:14:43.079Z",
        "updatedAt": "2024-07-17T22:14:43.079Z",
        "comments": []
    },
    {
        "id": "26a3c4bf-e327-4078-ac5e-3895edd5b38c",
        "title": "오늘 날씨",
        "content": "오늘 날씨 뭐야? 너무 덥다 진짜;;",
        "userId": "0hee",
        "like": 0,
        "createdAt": "2024-07-17T22:13:15.204Z",
        "updatedAt": "2024-07-17T22:13:15.204Z",
        "comments": []
    },
  ...
]
```
#### 특정 글 조회
request
```
GET http://localhost:3000/posts/9c97afe3-acbd-4c6b-a921-f9a7055219b4
```
response
```
{
    "id": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
    "title": "저녁 메뉴 추천 좀",
    "content": "뭐 먹을까? 댓글로 남겨줘.",
    "userId": "jungh",
    "like": 0,
    "createdAt": "2024-07-17T22:11:09.338Z",
    "updatedAt": "2024-07-17T22:11:09.338Z",
    "comments": []
}
```
#### 글 작성
request
```
POST http://localhost:3000/posts
Content-Type: application/json

{
    "title": "저녁 메뉴 추천 좀",
    "content": "뭐 먹을까? 댓글로 남겨줘.",
    "userId": "jungh",
    "like": 0
}
```
response
```
{
    "id": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
    "title": "저녁 메뉴 추천 좀",
    "content": "뭐 먹을까? 댓글로 남겨줘.",
    "userId": "jungh",
    "like": 0,
    "createdAt": "2024-07-17T22:11:09.338Z",
    "updatedAt": "2024-07-17T22:11:09.338Z"
}
```
#### 글 수정
request
```
PATCH http://localhost:3000/posts/9c97afe3-acbd-4c6b-a921-f9a7055219b4
Content-Type: application/json

{
    "content": "뭐 먹을까? 댓글로 남겨줘. 제발..."
}
```
response
```
{
    "id": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
    "title": "저녁 메뉴 추천 좀",
    "content": "뭐 먹을까? 댓글로 남겨줘. 제발...",
    "userId": "jungh",
    "like": 0,
    "createdAt": "2024-07-17T22:11:09.338Z",
    "updatedAt": "2024-07-17T22:20:16.451Z"
}
```
#### 글에 좋아요 누르기
request
```
PATCH http://localhost:3000/posts/like/9c97afe3-acbd-4c6b-a921-f9a7055219b4
```
response
```
{
    "id": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
    "title": "저녁 메뉴 추천 좀",
    "content": "뭐 먹을까? 댓글로 남겨줘. 제발...",
    "userId": "jungh",
    "like": 1,
    "createdAt": "2024-07-17T22:11:09.338Z",
    "updatedAt": "2024-07-17T22:21:32.828Z"
}
```
#### 글에 좋아요 취소하기
request
```
http://localhost:3000/posts/unlike/9c97afe3-acbd-4c6b-a921-f9a7055219b4
```
response
```
{
    "id": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
    "title": "저녁 메뉴 추천 좀",
    "content": "뭐 먹을까? 댓글로 남겨줘. 제발...",
    "userId": "jungh",
    "like": 0,
    "createdAt": "2024-07-17T22:11:09.338Z",
    "updatedAt": "2024-07-17T22:22:35.624Z"
}
```
#### 글 삭제
request
```
DELETE http://localhost:3000/posts/26a3c4bf-e327-4078-ac5e-3895edd5b38c
```
no response
#### 특정 글의 댓글 조회
request
```
GET http://localhost:3000/comments/9c97afe3-acbd-4c6b-a921-f9a7055219b4
```
response
```
[
    {
        "id": "1f381790-123a-4713-b942-0c94261b4690",
        "postId": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
        "userId": "fesoo",
        "content": "떡볶이",
        "createdAt": "2024-07-17T22:28:53.082Z",
        "updatedAt": "2024-07-17T22:28:53.082Z"
    },
    {
        "id": "483777e6-e6d7-41ee-a3ae-258f2c3c3408",
        "postId": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
        "userId": "0hee",
        "content": "마라탕",
        "createdAt": "2024-07-17T22:27:52.796Z",
        "updatedAt": "2024-07-17T22:27:52.796Z"
    },
    {
        "id": "53b0dee8-51b2-4b35-976e-54fbf921eb92",
        "postId": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
        "userId": "fesoo",
        "content": "치킨",
        "createdAt": "2024-07-17T22:28:31.140Z",
        "updatedAt": "2024-07-17T22:28:31.140Z"
    }
]
```
#### 댓글 작성
request
```
POST http://localhost:3000/comments
Content-Type: application/json

{
    "postId": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
    "userId": "0hee",
    "content": "마라탕"
}
```
response
```
{
    "id": "483777e6-e6d7-41ee-a3ae-258f2c3c3408",
    "postId": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
    "userId": "0hee",
    "content": "마라탕",
    "createdAt": "2024-07-17T22:27:52.796Z",
    "updatedAt": "2024-07-17T22:27:52.796Z"
}
```
#### 댓글 수정
request
```
PATCH http://localhost:3000/comments/53b0dee8-51b2-4b35-976e-54fbf921eb92
Content-Type: application/json

{
    "content": "치킨!!"
}
```
response
```
{
    "id": "53b0dee8-51b2-4b35-976e-54fbf921eb92",
    "postId": "9c97afe3-acbd-4c6b-a921-f9a7055219b4",
    "userId": "fesoo",
    "content": "치킨!!",
    "createdAt": "2024-07-17T22:28:31.140Z",
    "updatedAt": "2024-07-17T22:31:09.020Z"
}
```
#### 댓글 삭제
request
```
DELETE http://localhost:3000/comments/53b0dee8-51b2-4b35-976e-54fbf921eb92
```
no response

### 내용 정리
#### migration
schema.prisma 파일에 변경 사항이 있을 때마다 migration을 해주어야 한다.
```
npx prisma migrate dev
```
#### 개발 환경 세팅
`package.json` 파일을 생성하고 `npm install`를 실행하면 `package.json` 파일에 명시된 패키지들이 모두 설치된다.
```
{
  "dependencies": {
    "@prisma/client": "^5.4.2",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "is-email": "^1.0.2",
    "is-uuid": "^1.0.2",
    "prisma": "^5.4.2",
    "superstruct": "^1.0.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "type": "module",
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js"
  }
}
```
#### 로그인 기능 구현
node.js로 로그인 기능을 구현하는 방법은 session을 이용하는 방법과 cookie를 이용하는 방법이 있다. 그 중 나는 session을 이용하는 방법으로 구현했다.
우선 이를 위해 필요한 패키지들을 설치한다.
```
npm install bcryptjs
npm install cookie-parser
npm install express-session
```
다음의 코드를 app.js 앞쪽에 추가한다.
```
import bcrypt from "bcryptjs";
import cookieParser from 'cookie-parser';
import session from 'express-session';

app.use(cookieParser());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));
```
회원가입 기능 구현 코드
```
app.post("/register", asyncHandler(async (req, res) => {
  const { id, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await prisma.user.create({
    data: {
      id: id,
      password: hashedPassword,
    },
  });
  res.status(201).send(newUser);
}));
```
로그인 기능 구현 코드
```
app.post("/login", asyncHandler(async (req, res) => {
  const { id, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    console.log("user not found");
    return res.status(400).json({ message: "User not found" });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (isMatch) {
    if (!req.session.user) {
      req.session.user = {
        id: id,
        password: password,
        authorized: true,
      };
    }
    res.json({ message: "Login Success" });
  } else {
    res.status(400).json({ message: "Password incorrect" });
  }
}));
```
로그아웃 기능 구현 코드
```
app.post("/logout", asyncHandler(async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.json({ message: "Logout Success" });
  }
}));
```

### 회고
다른 부분들은 괜찮았는데, 회원가입/로그인 기능 구현이 어려웠다. node.js로는 처음 해보는 부분이어서 검색을 해가며 시도했고, 특히 패키지 설치하는 게 제대로 안 되어서 애를 먹었다. 첫번째 설치 시에는 게속 오류가 나서 한번 다 제거했다가 다시 설치하니 정상적으로 실행되었다.
추가로, Commet 테이블을 따로 만들어서 Post 출력할 때 Comment도 같이 출력되도록 구현했다.