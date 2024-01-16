const { v4: uuidv4 } = require('uuid');

const users = [
    {
      id: uuidv4(),
      name: 'Ann',
      email: 'ann@google.com',
      hobbies: ['books', 'sport', 'dancing']
    },
    {
      id: uuidv4(),
      name: 'Ben',
      email: 'ben@google.com',
      hobbies: ['series', 'sport']
    }
];

module.exports = users;