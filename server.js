
const config = {
    host: 'localhost',
    port: 5432,
    database: 'likeypixdb'
};

const pgp = require('pg-promise')({
    query: e => {
        // print the SQL query
        console.log(`QUERY: ${e.query}`);
    }
});
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
            select name, email from users
                where id = $1
            `, userId)
            .then(user => {
                return user;
            })
            .catch(e => {
                console.log(e);
            })
}

// const userPromise = getUserById(2);
// userPromise.then(user => {
//     console.log(user);
// });

// Get all posts
function getAllPosts() {
    console.log('starting getAllPosts()');
    // 2. return the whole promise chain
    return db.many(`
        select * from posts;
    `)
    .then((posts) => {
        console.log('I would be returning, but decided not to');
        // 1. return on behalf of the promise chain
        return posts;
        // posts.forEach((post) => {
        //     console.log(post.url);
        // })
    })
    .catch((e) => {
        console.log(e);
    })
}

function getLikesForPostId(postId) {
    return db.one(`
                select count(*) from likes
                    where post_id = $1
            `, postId)
            .then(({count}) => {
                // Destructure as it is passed
                // into the function.
                // const {count} = countObject;
                console.log(count);
                return count;
            })
            .catch((e) => {
                console.log(e);
            });
}

// const postsPromise = getAllPosts();
// console.log(postsPromise);
// console.log('that was postsPromise');
// postsPromise.then((results) => { 
//     console.log(results); 
//     console.log('yep those are all the posts');
// })

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


// Write the following, please!

// getAllComments
// getAllCommentsByUserId

// getAllCommentsWithUser
// getPostsWithLikes
function getPostsWithLikes() {
    // We'll merge results from 2 promise chains
    // into a single return value.
    console.log('Inside getPostsWithLikes()');
    getAllPosts()
        .then(posts => {
            console.log('I think it works...');
            console.log(posts);
            posts.forEach((post, index) => {
                // ???
                getLikesForPostId(post.id)
                    .then(count => {
                        // console.log(`The like count for post id ${post.id} is ${count}`);
                        post.likes = count;
                        // How do we know when to return?
                        // How do we return to the outer outer .then?                  
                    });
                   
            })
        })
        .catch(e => {
            console.log(e);
        })

}
getPostsWithLikes();
// getLikesForPostId(1)
//     .then(count => {
//         console.log(`The like count for post id 2 is ${count}`);
//     })

// Create

// Update

// Delete


// OK to leave this out for an express app.
// We want this for our command-line app.


// getPostsByUserId(2);




// pgp.end();