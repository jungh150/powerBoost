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
![스크린샷 2024-07-18 070101](https://github.com/user-attachments/assets/20f90f20-e054-41f9-8c6c-807ebff77806)
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
![스크린샷 2024-07-18 070236](https://github.com/user-attachments/assets/9604018c-0b09-4ca7-98fd-7e68438b4a09)
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
![스크린샷 2024-07-18 070426](https://github.com/user-attachments/assets/419854e6-0b0d-4fc7-bdbd-6d947c96abcd)
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
![스크린샷 2024-07-18 071638](https://github.com/user-attachments/assets/169da79d-9c44-436a-b914-141bdfa39ff4)
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
![스크린샷 2024-07-18 071806](https://github.com/user-attachments/assets/132272c4-7587-45e9-b22c-b430a4e8d49d)
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
![스크린샷 2024-07-18 071232](https://github.com/user-attachments/assets/789c39ef-4afd-40f2-8096-4c519a200b43)
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
![스크린샷 2024-07-18 072048](https://github.com/user-attachments/assets/b744cd44-e592-430a-971e-555c8b07ce76)
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
![스크린샷 2024-07-18 072146](https://github.com/user-attachments/assets/108c4593-58a9-4693-8a2c-78e60a9e1cdd)
#### 글에 좋아요 취소하기
request
```
PATCH http://localhost:3000/posts/unlike/9c97afe3-acbd-4c6b-a921-f9a7055219b4
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
![스크린샷 2024-07-18 072246](https://github.com/user-attachments/assets/795be598-b815-4ecc-88fd-d98ca6ec1003)
#### 글 삭제
request
```
DELETE http://localhost:3000/posts/26a3c4bf-e327-4078-ac5e-3895edd5b38c
```
no response
![스크린샷 2024-07-18 072408](https://github.com/user-attachments/assets/d79e54a6-f133-42fa-9fba-44cb82290f04)
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
![스크린샷 2024-07-18 073018](https://github.com/user-attachments/assets/f75c0a47-3565-46fe-a74d-d50b0294cd68)
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
![스크린샷 2024-07-18 072823](https://github.com/user-attachments/assets/984f4b2a-18e4-4502-b19f-45469c97204f)
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
![스크린샷 2024-07-18 073154](https://github.com/user-attachments/assets/cb6387c6-a898-4737-aa52-1ab52e2d22e1)
#### 댓글 삭제
request
```
DELETE http://localhost:3000/comments/53b0dee8-51b2-4b35-976e-54fbf921eb92
```
no response
![스크린샷 2024-07-18 075315](https://github.com/user-attachments/assets/2fea4c57-ec95-4029-a7f5-0c812f802597)

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

## 3주차: jwt 인증 방식으로 변경 + 스크랩 기능/게시물 검색 기능 추가

### 주요 기능
#### 특정 유저의 스크랩 조회
request
```
GET http://localhost:3000/scrap/user-scrap/jungh
```
response
```
[
    {
        "id": "36ec7852-f6c7-498a-8afe-15af330afe01",
        "createdAt": "2024-07-23T17:26:08.805Z",
        "updatedAt": "2024-07-23T17:26:08.805Z",
        "userId": "jungh",
        "postId": "a88ed312-dd18-4a06-b069-65e381862b59"
    },
    {
        "id": "c64b8f5f-96b7-47db-b480-1353efd86152",
        "createdAt": "2024-07-23T17:24:39.209Z",
        "updatedAt": "2024-07-23T17:24:39.209Z",
        "userId": "jungh",
        "postId": "231e92b7-1186-4112-b013-6da658368916"
    }
]
```
![스크린샷 2024-07-24 025816](https://github.com/user-attachments/assets/e46da1b5-5ccd-4f81-aa74-7dcf6945e92b)
#### 특정 글의 스크랩 조회
request
```
GET http://localhost:3000/scrap/post-scrap/231e92b7-1186-4112-b013-6da658368916
```
response
```
[
    {
        "id": "9ac04a86-6b5f-41a1-84d1-df0fe9dc9bc5",
        "createdAt": "2024-07-23T18:01:52.897Z",
        "updatedAt": "2024-07-23T18:01:52.897Z",
        "userId": "newclean",
        "postId": "231e92b7-1186-4112-b013-6da658368916"
    },
    {
        "id": "c64b8f5f-96b7-47db-b480-1353efd86152",
        "createdAt": "2024-07-23T17:24:39.209Z",
        "updatedAt": "2024-07-23T17:24:39.209Z",
        "userId": "jungh",
        "postId": "231e92b7-1186-4112-b013-6da658368916"
    }
]
```
![스크린샷 2024-07-24 025853](https://github.com/user-attachments/assets/8a069300-5214-4807-9908-4b31d89cfb85)
#### 스크랩
request
```
POST http://localhost:3000/scrap
Content-Type: application/json

{
    "postId": "231e92b7-1186-4112-b013-6da658368916"
}
```
response
```
{
    "id": "9ac04a86-6b5f-41a1-84d1-df0fe9dc9bc5",
    "createdAt": "2024-07-23T18:01:52.897Z",
    "updatedAt": "2024-07-23T18:01:52.897Z",
    "userId": "newclean",
    "postId": "231e92b7-1186-4112-b013-6da658368916"
}
```
![스크린샷 2024-07-24 025737](https://github.com/user-attachments/assets/8da84075-2f1f-452a-a503-5ebeb581d9b1)
#### 스크랩 취소
request
```
DELETE http://localhost:3000/scrap/231e92b7-1186-4112-b013-6da658368916
```
no response
![스크린샷 2024-07-24 030036](https://github.com/user-attachments/assets/c0ada7a9-f2df-491b-b612-94f5d89d19b8)
#### 게시물 검색
request
```
GET http://localhost:3000/posts?search=저녁
```
response
```
[
    {
        "id": "d4d5cb73-0d5c-4b9e-af08-60b9128f2f80",
        "title": "저녁 메뉴 추천 좀",
        "content": "뭐 먹을까? 댓글로 남겨줘.",
        "userId": "jungh",
        "like": 0,
        "createdAt": "2024-07-22T11:44:27.119Z",
        "updatedAt": "2024-07-22T11:44:27.119Z",
        "comments": []
    }
]
```
![스크린샷 2024-07-24 030750](https://github.com/user-attachments/assets/6a698810-0646-4b63-b9b3-cafa5ee0b568)

### 내용 정리
#### database erd
![스크린샷 2024-07-23 054630](https://github.com/user-attachments/assets/3910b589-90e4-44f1-8dbd-f37f473d8076)
https://www.erdcloud.com/d/8v2Kc5jKSjMdFZfuo
#### 로그인 기능: jwt 인증 방식으로 변경
로그인 기능: 해당 유저가 있는지, 비밀번호가 일치하는지 확인 후 jwt 토큰을 발급한다. 
```
app.post("/login", asyncHandler(async (req, res) => {
  const { id, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  // 해당 유저가 없는 경우
  if (!user) {
    console.log("가입되지 않은 아이디입니다.");
    return res.status(400).json({ message: "가입되지 않은 아이디입니다." });
  }
  // 비밀번호가 일치하는지 확인
  const isMatch = bcrypt.compareSync(password, user.password);
  if (isMatch) {
    const payload = { userId: id };
    const token = generateToken(payload);
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ message: "로그인 되었습니다." });
  } else {
    res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }
}));
```
로그아웃 기능: 토큰이 있는지, 정상적인 토큰인지 확인한 후 토큰 관련 쿠키를 삭제한다.
```
app.post("/logout", asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  // 토큰이 없을 경우
  if (!token) {
    res.status(400).json({ message: '토큰이 없습니다. 로그인 상태를 확안하세요.' });
    return;
  }
  // 토큰이 정상적인 토큰이 아닌 경우
  const decoded = jwt.decode(token);
  if (!decoded) {
      res.status(401).json({ message: '잘못된 토큰입니다. 로그인 상태를 확인하세요.' });
      return;
  }
  // 쿠키 삭제
  res.clearCookie('token');
  res.json({ message: '로그아웃 되었습니다.' });
}));
```
#### jwt.js (jwt 토큰 관련 파일)
```
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET_KEY;

// 새로운 토큰을 생성하는 함수
export const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '10m' });
    return token;
};

// 기존 토큰을 사용하여 새로운 토큰을 생성하는 함수
export const refreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    const payload = {
      userId: decoded.userId,
      isAdmin: decoded.isAdmin,
    };
    const newToken = generateToken(payload);
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

// 로그인이 필요한 api 요청 시
export function loginRequired(req, res, next) {
  // 헤더에서 토큰 가져오기
  const headerToken = req.headers['authorization']?.split(' ')[1];
  // 쿠키에서 토큰 가져오기
  const cookieToken = req.cookies.token;
  
  const token = headerToken || cookieToken;
  // 토큰이 없을 경우
  if (!token || token === "null") {
      console.log("Authorization 토큰: 없음");
      res.status(401).json({
          result: "forbidden-approach",
          message: "로그인한 유저만 사용할 수 있는 서비스입니다.",
      });
      return;
  }
  // 해당 토큰이 정상적인 토큰인지 확인
  try {
      const jwtDecoded = jwt.verify(token, secretKey);
      const userId = jwtDecoded.userId;
      req.currentUserId = userId;
      // 토큰 갱신
      const newToken = refreshToken(token);
      if (newToken) {
        res.cookie('token', newToken, { httpOnly: true, maxAge: 3600000 });
      }
      next();
  } catch (error) {
      res.status(401).json({
          result: "forbidden-approach",
          message: "정상적인 토큰이 아닙니다.",
      });
      return;
  }
}
```
#### 게시물 검색 기능
? 뒤에 search={키워드}를 붙여서 쿼리를 보내면 키워드가 제목 또는 내용에 포함되는 글을 모두 조회할 수 있다. 
```
// 전체 글 조회
app.get('/posts', asyncHandler(async (req, res) => {
  const { search } = req.query;
  const searchCondition = search ? {
    OR: [
      {
        title: {
          contains: search,
          // mode: 'insensitive', // 대소문자 구분 없이 검색
        },
      },
      {
        content: {
          contains: search,
          // mode: 'insensitive', // 대소문자 구분 없이 검색
        },
      },
    ],
  } : {};

  const posts = await prisma.post.findMany({
    where: searchCondition,
    include: {
      comments: true,
    },
  });
  res.send(posts);
}));
```

### 회고
jwt 토큰은 처음 다뤄봐서 이 부분이 제일 오래 걸렸다. 구글링을 많이 하면서 어떤식으로 하는지를 배우고 여러 오류들을 만나고 해결하면서 겨우 했다. 그리고 게시물 검색할 때 대소문자 구분 없이 검색할 수 있도록 `mode: 'insensitive'`을 넣었는데, 무슨 이유에서인지 자꾸 오류가 나서 일단 뺐다. 다른 방법으로 해야할 것 같다.
