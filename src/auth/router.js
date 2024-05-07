'use strict';
require('dotenv').config();
const router = require('express').Router();

const bcrypt = require("bcrypt");
const base64 = require("base-64");

const {Users} = require('./models');
router.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await Users.create(req.body);
        res.status(200).json(record);
    } catch (e) { res.status(403).send(
        'Error Creating User');
        console.error(e.message);
    }
});
router.post('/signin', basicAuth);
router.get('/', test);

function test(req, res) {
    console.log("router is online")
    res.status(200).send("Hello World");
}

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo

async function handleSignIn(req, res, next) {
    console.log("body?",req.body)
    try {
        req.body.password = await bcrypt.hash(req.body.password, 4);
        const record = await Users.create(req.body);
        res.status(200).json(record);
    } catch (e) {
        res.status(403).send('Error Creating User / Sign in module');
        console.error("sign up fail ",e.message) //added
    }
}

// Sign in Route -- login with username and password
// test with httpie http post :3000/signin -a john:foo
async function basicAuth(req, res) {
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'am9objpmb28=']
    let encString = basicHeaderParts.pop();  // am9objpmb28=
    let decString = base64.decode(encString); // "username:password"
    let [username, password] = decString.split(':'); // username, password
    /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the _plaintext_(decoded from Base64 !) password we now have
    against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
    try {
        const user = await Users.findOne({where: {username: username}});
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.status(200).json(user);
        } else {
            throw new Error('Invalid User');
            console.error("it says:", e.message);
        }
    } catch (error) {
        res.status(403).send('Invalid Login');
    }
}

module.exports = router;