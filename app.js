import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import { PrismaClient, Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { generateToken, loginRequired } from './jwt.js';
//import jwtt from './jwt.js';

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET_KEY;

const app = express();
app.use(express.json());
app.use(cookieParser());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === 'StructError' ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        res.sendStatus(404);
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

/*********** auth ***********/

// 회원가입
app.post("/register", asyncHandler(async (req, res) => {
  const { id, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (user) {
    return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
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

// 로그인
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

// 로그아웃
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

/*********** users ***********/

// 전체 유저 조회
app.get('/users', asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
}));

// 특정 유저 조회
app.get('/users/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));

// 유저 생성
app.post('/users', asyncHandler(async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.status(201).send(user);
}));

// 유저 수정
app.patch('/users/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id },
    data: req.body,
  });
  res.send(user);
}));

// 유저 삭제
app.delete('/users/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id },
  });
  res.sendStatus(204);
}));

/*********** posts ***********/

// 전체 글 조회
app.get('/posts', asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  });
  res.send(posts);
}));

// 특정 글 조회
app.get('/posts/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      comments: true,
    },
  });
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));

// 글 작성
app.post('/posts', loginRequired, asyncHandler(async (req, res) => {
  const post = await prisma.post.create({
    data: {
      ...req.body,
      userId: req.currentUserId,
    }
  });
  res.status(201).send(post);
}));

// 글 수정
app.patch('/posts/:id', loginRequired, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: { id },
    data: req.body,
  });
  res.send(post);
}));

// 글에 좋아요 누르기
app.patch('/posts/like/:id', loginRequired, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id },
  });
  const likeNum = post.like + 1;
  const newPost = await prisma.post.update({
    where: { id },
    data: { like: likeNum },
  });
  res.send(newPost);
}));

// 글에 좋아요 취소하기
app.patch('/posts/unlike/:id', loginRequired, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id },
  });
  let likeNum = post.like - 1;
  if (likeNum < 0) likeNum = 0;
  const newPost = await prisma.post.update({
    where: { id },
    data: { like: likeNum },
  });
  res.send(newPost);
}));

// 글 삭제
app.delete('/posts/:id', loginRequired, asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: { id },
  });
  res.sendStatus(204);
}));

/*********** commets ***********/

// 전체 댓글 조회
app.get('/comments', asyncHandler(async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.send(comments);
}));

// 특정 글의 댓글 조회
app.get('/comments/:postId', asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      comments: true,
    },
  });
  if (post) {
    res.send(post.comments);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));

// 댓글 작성
app.post('/comments', loginRequired, asyncHandler(async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      ...req.body,
      userId: req.currentUserId,
    }
  });
  res.status(201).send(comment);
}));

// 댓글 수정
app.patch('/comments/:id', loginRequired, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await prisma.comment.update({
    where: { id },
    data: req.body,
  });
  res.send(comment);
}));

// 댓글 삭제
app.delete('/comments/:id', loginRequired, asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.comment.delete({
    where: { id },
  });
  res.sendStatus(204);
}));

/*********** scrap ***********/

// 전체 스크랩 조회
app.get('/scrap', asyncHandler(async (req, res) => {
  const scraps = await prisma.scrap.findMany();
  res.send(scraps);
}));

// 특정 유저의 스크랩 조회
app.get('/scrap/user-scrap/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await prisma.post.findUnique({
    where: { id: userId },
    include: {
      scarap: true,
    },
  });
  if (user) {
    res.send(user.scrap);
  } else {
    res.status(404).send({ message: 'Cannot find given user id.' });
  }
}));

// 특정 글의 스크랩 조회
app.get('/scrap/post-scrap/:postId', asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      scrap: true,
    },
  });
  if (post) {
    res.send(post.scrap);
  } else {
    res.status(404).send({ message: 'Cannot find given post id.' });
  }
}));

// 스크랩
app.post('/scrap', loginRequired, asyncHandler(async (req, res) => {
  const scrap = await prisma.comment.create({
    data: {
      ...req.body,
      userId: req.currentUserId,
    }
  });
  res.status(201).send(scrap);
}));

app.listen(3000, () => console.log('Server Started'));