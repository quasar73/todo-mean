const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.dev');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);

        if (passwordsMatch) {
            const token = jwt.sign({
               email: user.email,
               userName: user.userName,
               userId: user._id 
            }, keys.jwt, {
                expiresIn: keys.jwtExpire
            });

            res.status(200).json({
                token: `${token}`
            });
        } else {
            res.status(403).json({
                message: 'Wrong email or password!'
            });
        }
    } else {
        res.status(403).json({
            message: 'Wrong email or password!'
        });
    }
    
}

module.exports.register = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        res.status(409).json({
            message: 'This user is already exist.'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (ex) {
            errorHandler(res, ex);
        }
    }
}
