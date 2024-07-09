import express from 'express';
import posts from './data/mock.js';

const app = express();
app.use(express.json());

// 전체 글 조회
app.get('/posts', (req, res) => {
    res.send(posts);
});

// 특정 글 조회
app.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.send(post);
    } else {
        res.status(404).send({ message: 'Cannot find given id.' });
    }
});

// 글 작성
app.post('/posts', (req, res) => {
    const newPost = req.body;
    const ids = posts.map((post) => post.id);
    newPost.id = Math.max(...ids) + 1;
    newPost.isliked = false;
    newPost.comments = [];
    newPost.createdAt = new Date();
    newPost.updatedAt = new Date();

    posts.push(newPost);
    res.status(201).send(newPost);
});

// 글 수정 (글에 좋아요 달기)
app.patch('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (post) {
        Object.keys(req.body).forEach((key) => {
            post[key] = req.body[key];
        });
        post.updatedAt = new Date();
        res.send(post);
    } else {
        res.status(404).send({ message: 'Cannot find given id.' });
    }
});

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

// 글 삭제
app.delete('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = posts.findIndex((post) => post.id === id);
    if (idx >= 0) {
        posts.splice(idx, 1);
        res.sendStatus(204);
    } else {
        res.status(404).send({ message: 'Cannot find given id.' });
    }
});

app.listen(3000, () => console.log('Server Started'));