const User = require('../models/userModel');

//@desc Gets All Users
//@route GET /users
async function getUsers(res){
    try {
        const users = await User.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
}

//@desc Gets Single User
//@route GET /user?userId=<number>
async function getUser(res, userId){
    try {
        const user = await User.findById(userId);
        if(!user){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'User Not Found'}));
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        }       
    } catch (error) {
        console.log(error);
    }
}

//@desc Create An User
//@route POST /user
async function createUser(req, res){
    try {
        const body = await getPostData(req);

        const { name, email } = JSON.parse(body);
        const user = { name, email };

        const newUser = await User.create(user);

        res.writeHead(201, { 'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
    }
}

//@desc Update An User
//@route PUT /user?userId=<number>
async function updateUser(req, res, userId){
    try {
        const user = await User.findById(userId);

        if(!user){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'User Not Found'}));
        }else{

            const body = await getPostData(req);

            const { name, email } = JSON.parse(body);
            const userData = {
                name: name || user.name,
                email: email || user.email, 
            };

            const updateUser = await User.update(userId, userData);

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updateUser))
        } 
    } catch (error) {
        console.log(error);
    }
}

// @desc    Delete User
// @route   DELETE /user?userId=<number>
async function deleteUser(req, res, userId) {
    try {
        const user = await User.findById(userId);

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User Not Found' }));
        } else {
            await User.remove(userId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `User ${userId} removed` }));
        }
    } catch (error) {
        console.log(error);
    }
}

//@desc Gets User Hobbies
//@route GET /user/hobbies?userId=<number>
async function getUserHobbies(response, userId) {
    try{
        const user = await User.findByIdFull(userId);
    
        if(user) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(user.hobbies));
        } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('User not found');
        }
    }catch (error) {
        console.log(error);
    }
}

// @desc    Add A New Hobby To User
// @route   POST /user/hobbies?userId=<number>
async function addHobby(req, res, userId) {
    try {
        const user = await User.findByIdFull(userId);

        if(!user){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'User Not Found'}));
        }else{
            const body = await getPostData(req);
            const { hobby } = JSON.parse(body);

            await User.addHobby(user, hobby);

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(await User.findById(userId)));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc    Delete Hobby From User
// @route   POST /user/hobbies?userId=<number>&hobbyName=<string>
async function deleteHobby(req, res, userId, hobbyName) {
    try {
        const user = await User.findByIdFull(userId);
        if(!user){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'User Not Found'}));
        }else{

            await User.removeHobby(user, hobbyName);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Hobby: '${hobbyName}' removed` }));
        }
    } catch (error) {
        console.log(error);
    }
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    getUsers,
    getUser,
    getUserHobbies,
    createUser,
    updateUser,
    deleteUser,
    addHobby,
    deleteHobby
}