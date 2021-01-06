const userService = require('../Services/User.service');
const userController = {};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


userController.isAuthentication = async (req, res, next) => {
    try{
        const verified = await jwt.verify(req.headers.token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(400).json({ error: true, data: null, token: null, message: 'user not authenticated' });
        };
        next();
    }catch (e) {
        console.log(e);
        return res.status(500).json({error: e.message, data: null, token: null, message:'something wrong in.'})
    }
}

const hashPassword = (password, saltRound) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRound, (err, hash) => {
            if(err) reject(err);
            resolve(hash);
        });
    });
};

userController.register = async (req, res, next) => {
    try{
        const { body } = req;
        const saltRound = 10;
        body.password = await hashPassword(body.password, saltRound);
        const user = await userService.create(body);
        const userObj = JSON.parse(JSON.stringify(user));
        delete userObj.password;

        const token = await jwt.sign({
            data:userObj
        }, process.env.JWT_SECRET,{
            expiresIn:'24h'
        });
        return res.status(200).json({error: false, data: null, token: token, message:'register successfully create'})
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e.message, data: null, token: null, message:'there are something wrong in register.'})
    }
};

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, match) => {
            if(err) reject(err);
            resolve(match);
        });
    });
};


userController.login = async (req, res, next) => {
    try{
        const user = await userService.findUserByEmail(req.body.email);
        const matchPassword = await comparePassword(req.body.password, user.password);
        if(!matchPassword){
            return res.status(400).json({error: true, data: null, token: null, message:'Password does not matched'});
        };
        const userObj = JSON.parse(JSON.stringify(user));
        delete userObj.password;

        const token = jwt.sign({
            data: userObj
        }, process.env.JWT_SECRET,{
            expiresIn: '24h'
        })
        return res.status(200).json({error: false, data: null, token: token, message:'login successfully create'})
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e.message, data: null, token: null, message:'there are something wrong in login.'})
    }
}

module.exports = userController;