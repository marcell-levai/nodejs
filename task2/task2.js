const WithTime = require('../classes/withTime');

const task2 = () => {
    const withTime = new WithTime();

    withTime.on('begin', () => console.log('About to execute'));
    withTime.on('end', () => console.log('Done with execute'));

    const jsonUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    const fetchJson = async () => {
    const response = await fetch(jsonUrl);
    return await response.json();
    };

    withTime.execute(fetchJson);
    console.log(withTime.rawListeners("end"));
}

module.exports = task2;