'use strict';


// Sign in Route -- login with username and password
// Test httpie http post :3000/signin -a john:foo
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

module.exports.basicAuth = basicAuth;