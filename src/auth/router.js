'use strict';
const router = require('express').Router();

const bcrypt = require("bcrypt");
// const base64 = require("base-64");

const {Users} = require('./models/db');
const {logger} = require("sequelize/lib/utils/logger");
const {basicAuth} = require("./middleware/basic");

router.post('/signup', handleSignUp);
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

async function handleSignUp(req, res, next) {
    console.log("body?", req.body)
    try {
        req.body.password = await bcrypt.hash(req.body.password, 4);
        const record = await Users.create(req.body);
        res.status(200).json(record);
    } catch (e) {
        res.status(403).send('Error Creating User / Sign in module');
        console.error("sign up fail ", e.message) //added
    }
    next(console.log("Im next - single link list!"))
}


module.exports = router;