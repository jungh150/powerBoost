import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bcrypt from "bcryptjs";
import { PrismaClient, Prisma } from '@prisma/client';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const { SECRETE_KEY_CS } = process.env;
app.use(cookieParser(SECRETE_KEY_CS));
app.use(session({
  secret: SECRETE_KEY_CS,
  resave: false,
  saveUninitialized: true
}));

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
app.post('/posts', asyncHandler(async (req, res) => {
  const post = await prisma.post.create({
    data: req.body,
  });
  res.status(201).send(post);
}));

// 글 수정
app.patch('/posts/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: { id },
    data: req.body,
  });
  res.send(post);
}));

// 글 삭제
app.delete('/posts/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: { id },
  });
  res.sendStatus(204);
}));

/*********** commets ***********/

// 글에 댓글 달기
// app.patch('/comments/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const post = posts.find((post) => post.id === id);
//   if (post) {
//     post['comments'].push(req.body['comment']);
//     res.send(post);
//   } else {
//     res.status(404).send({ message: 'Cannot find given id.' });
//   }
// });

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
app.post('/comments', asyncHandler(async (req, res) => {
  const comment = await prisma.comment.create({
    data: req.body,
  });
  res.status(201).send(comment);
}));

// 댓글 수정
app.patch('/comments/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await prisma.comment.update({
    where: { id },
    data: req.body,
  });
  res.send(comment);
}));

// 글 삭제
app.delete('/comments/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.comment.delete({
    where: { id },
  });
  res.sendStatus(204);
}));

app.listen(3000, () => console.log('Server Started'));