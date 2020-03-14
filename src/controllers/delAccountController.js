const {auth} = require('../middlewares/auth'),
    User = require("../model/Users").User,
    sessionStore = require('../db/redis');

const delAcct = async (req, res) => {

    if (req.param.token === null || undefined) return res.send('unAuthorized');

    let username = await auth.getSession(req.params.token).catch(err=>{});

    if (username === null || undefined) return res.send('unAuthorized');

    sessionStore.del(req.params.token, (err, resp) => {
        if (!err) {
            User.deleteOne({'username':username},()=>{
                return res.send("Account deleted");
            });
        }});
};

module.exports = delAcct;