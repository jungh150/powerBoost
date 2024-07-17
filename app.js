import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

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
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
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
  const posts = await prisma.post.findMany();
  res.send(posts);
}));

// 특정 글 조회
app.get('/posts/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));

// 글 작성
app.post('/posts', asyncHandler(async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.status(201).send(user);
}));

// 글 수정
app.patch('/posts/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id },
    data: req.body,
  });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));

// 글 삭제
app.delete('/posts/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id },
  });
  res.sendStatus(204);
}));

/*********** commets ***********/

// 글에 댓글 달기
app.patch('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (post) {
    post['comments'].push(req.body['comment']);
    res.send(post);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

app.listen(3000, () => console.log('Server Started'));