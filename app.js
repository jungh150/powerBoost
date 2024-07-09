import express from 'express';
import posts from './data/mock.js';

const app = express();
app.use(express.json());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.send(post);
    } else {
        res.status(404).send({ message: 'Cannot find given id.' });
    }
});

app.post('/posts', (req, res) => {
    const newPost = req.body;
    const ids = posts.map((post) => post.id);
    newPost.id = Math.max(...ids) + 1;
    newPost.isliked = false;
    newPost.comments = {};
    newPost.createdAt = new Date();
    newPost.updatedAt = new Date();

    posts.push(newPost);
    res.status(201).send(newPost);
});

app.listen(3000, () => console.log('Server Started'));