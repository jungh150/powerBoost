import express from 'express';
import posts from './data/mock.js';

const app = express();

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

app.listen(3000, () => console.log('Server Started'));