const http = require('http');
const url = require('url');
const { getUsers, getUser, createUser, updateUser, deleteUser, getUserHobbies, addHobby, deleteHobby } = require('./controllers/userController');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const { userId } = parsedUrl.query;

    if(req.method === 'GET'){
        if(path === '/users'){
            getUsers(res);
        }else if(path === '/user/hobbies'){
            getUserHobbies(res, userId);
        }else if('/user'){
            getUser(res, userId);
        }
    }else if(req.method === 'POST'){
        if(path === '/user'){
            createUser(req, res);
        }else if (path === '/user/hobbies') {
            addHobby(req, res, userId);
        }    
    }else if(req.method === 'PUT'){
        if(path === '/user'){
            updateUser(req, res, userId);
        }
    }else if (req.method === 'DELETE') {
        if(path === '/user'){
            deleteUser(req, res, userId);
        }else if(path === '/user/hobbies'){
            const { hobbyName } = parsedUrl.query;
            deleteHobby(req, res, userId, hobbyName);
        }
    }else{
        res.writeHead(404, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));