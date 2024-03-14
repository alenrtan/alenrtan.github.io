const express = require('express');
const {createServer} = require('node:http');
const {join} = require('node:path');

const app = express();
const server = createServer(app);

app.use(express.static('public/'));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
});

app.use(express.static('public/'));
app.get('/pages/connect4.html', (req, res) => {
    res.sendFile(join(__dirname, 'pages/connect4.html'))
});

app.get('/pages/contact.html', (req, res) => {
    res.sendFile(join(__dirname, 'pages/contact.html'))
});

app.get('/pages/games.html', (req, res) => {
    res.sendFile(join(__dirname, 'games.html'))
});

app.get('/pages/hobbies.html', (req, res) => {
    res.sendFile(join(__dirname, 'hobbies.html'))
});

app.get('/pages/projects.html', (req, res) => {
    res.sendFile(join(__dirname, 'projects.html'))
});

server.listen(3000, () => {
    console.log('server running at localhost:3000');
});