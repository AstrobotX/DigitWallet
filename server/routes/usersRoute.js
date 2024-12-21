const router = require('express').Router();
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

//register user account

router.post('/register', async (req, res) => {
    try{
        //check if email already exists
        let user = await User.findOne({email: req.body.email});
        if(user){  
            return res.send({
                success: false,
                message: 'Email already exists',
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save().catch((error) => {
            alert('error saving user: ', error.message);
        });
        res.send({
            message: 'User account created successfully',
            data : null,
            success: true,
        });
    }

    catch(error){
        res.send({
            message: error.message,
            success: false,
        });
    }
});

//login user account

router.post('/login', async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        //check if email exists
        if(!user){
            return res.send({
                success: false,
                message: 'User not found',
            });
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword){
            return res.send({
                success: false,
                message: 'Invalid password',
            });
        }

        //generate token
        const token = jwt.sign({userId : user._id}, process.env.jwt_secret, {expiresIn: '1d'});
        res.send({
            message: 'Login successful',
            data: token,
            success: true,
        });


    } catch(error){
        res.send({
            message: error.message,
            success: false,
        });
    }
});
 
//get user profile

router.post('/get-user-info', authMiddleware , async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        user.password = "";
        res.send({
            message: 'User profile retrieved successfully',
            data: user,
            success: true,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

module.exports = router;