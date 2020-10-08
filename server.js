
const config = {
    host: 'localhost',
    port: 5432,
    database: 'likeypixdb'
};

const pgp = require('pg-promise')();
const db = pgp(config);

db.query(`
    select * from users;
`)
.then((results) => {
    results.forEach((user) => {
        console.log(`${user.name}: ${user.email}`);
    })
})
.catch((e) => {
    console.log('Whoopsie');
    console.log(e);
});

// OK to leave this out for an express app.
// We want this for our command-line app.
pgp.end();
