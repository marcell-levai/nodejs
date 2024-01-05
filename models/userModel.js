const users = require('../data/usersData');

function findAll() {
    return new Promise((resolve, reject) => {
        const usersData = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email
          }));
        resolve(usersData);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.id === Number(id)); 
        console.log(user);
        if(user){
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            resolve(userData);
        }else{
            resolve();
        }     
    });
}

function findByIdFull(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.id === Number(id)); 
        resolve(user);    
    });
}

function create(user) {   
    return new Promise((resolve, reject) => {
        const id = users.length + 1;
        const newUser = {id: id, ...user, hobbies: []};
        users.push(newUser);
        resolve(newUser);
    });
}

function update(id, user) {
    return new Promise((resolve, reject) => {
        const userIndex = users.findIndex((u) => u.id === Number(id));
        users[userIndex].name = user.name || users[userIndex].name;
        users[userIndex].email = user.email || users[userIndex].email;
        resolve(users[userIndex]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex(user => user.id === Number(id));
        if (index !== -1) {
            users.splice(index, 1)[0];
        }
        resolve();
    });
}

function addHobby(user, hobby) {
    return new Promise((resolve, reject) => {
        user.hobbies.push(hobby);
        resolve(user);
    });
}

function removeHobby(user, hobbyName){
    return new Promise((resolve, reject) => {
        const index = user.hobbies.findIndex(hobby => hobby === hobbyName);
        if (index !== -1) {
            user.hobbies.splice(index, 1)[0];
        }
        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    findByIdFull,
    create,
    update,
    remove,
    addHobby,
    removeHobby,
}