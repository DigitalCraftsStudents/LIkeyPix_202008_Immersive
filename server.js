
const config = {
    host: 'localhost',
    port: 5432,
    database: 'likeypixdb'
};

const pgp = require('pg-promise')();
const db = pgp(config);

// Demo query from lecture slides
// db.query(`
//     select * from users;
// `)
// .then((results) => {
//     results.forEach((user) => {
//         console.log(`${user.name}: ${user.email}`);
//     })
// })
// .catch((e) => {
//     console.log('Whoopsie');
//     console.log(e);
// });

// Read
// Get all users

function getAllUsers() {
    db.many(`
        select * from users;
    `)
    .then((users) => {
        users.forEach((user) => {
            console.log(`${user.name}: ${user.email}`);
        });
    })
    .catch((e) => {
        console.log(e);
    })
}

function getUserById(userId) {    
    return db.one(`
            select * from users
                where id = $1
            `, userId)
            .then(user => {
                return user;
            })
            .catch(e => {
                console.log(e);
            })
}

// Get all posts
function getAllPosts() {
    db.many(`
        select * from posts;
    `)
    .then((posts) => {
        posts.forEach((post) => {
            console.log(post.url);
        })
    })
    .catch((e) => {
        console.log(e);
    })
}

// Get all posts by a specific user
function getPostsByUserId(userId) {
    // 1. Get the user
    // 2. and get their posts    
    db.many(`
    select * from posts
    where user_id = $1
    ;        
    `, userId)
    .then(posts => {        
        const userPromise = getUserById(userId);    
        console.log(userPromise);
        userPromise.then(theUser => {
            // console.log(theUser);
            posts.forEach((post, index) => {
                console.log(`${theUser.name}: ${post.url}`);
            })
        })
    })
    .catch(e => {
        console.log(e);
    })

    // 3. and return it all together!!!    
}
getPostsByUserId(2);

// Write the following, please!

// getAllComments
// getAllCommentsByUserId

// getAllCommentsWithUser
// getPostsWithLikes



// Create

// Update

// Delete


// OK to leave this out for an express app.
// We want this for our command-line app.
pgp.end();
