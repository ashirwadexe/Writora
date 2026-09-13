import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { loginUserSchema, registerUserSchema } from "../validators/user.validator.js";
import jwt from "jsonwebtoken";

// POST: api/users/register
export const register = async (req, res) => {
    try {
        // validate user credentials using zod
        // validate request body
        const result = registerUserSchema.safeParse(req.body);

        // validation failed
        if(!result.success){
            return res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: result.error.flatten()
            });
        };

        // validated data
        const { name, email, password} = result.data;
    
        // check if user already exist using his/her email
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({
                message: "Email already exits",
                success: false
            });
        };

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Account Created!!!",
            // response me ham password nhi bhejenge bas user ka name or email for security
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.log("Registration error: ", error)
        return res.status(500).json({
            message: error.message
        });
    };
};

// POST: api/users/login
export const login = async (req, res) => {
    try {

        const result = loginUserSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: result.error.flatten()
            });
        };

        const { email, password } = result.data;

        let user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                message: "User not exist, try another email",
                success: false
            });
        };

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Wrong Password",
                success: false
            });
        };

        // Creating token
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '1d'});

        user = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
            message: `Welcome, ${user.name}!`,
            success: true,
            user
        });
        
    } catch (error) {
        console.log("Login error: ", error)
        return res.status(500).json({
            message: error.message
        });
    };
};

// GET: /api/users/logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0, httpOnly: true, sameSite: 'strict'}).json({
            message: "Logged out!!!",
            success: true
        });
    } catch (error) {
        console.log("Logout error: ", error)
        return res.status(500).json({
            message: error.message
        });
    };
};

// GET: /api/users/profile
export const getProfile = async (req, res) => {
    try {
        // yaha pe req.user --> isAUthenticated me decode user se fetch kr ke de raha hai
        const { _id, name, email } = req.user;
        
        return res.status(200).json({
            success: true,
            user: {
                id: _id,
                name,
                email
            }
        });


        // return res.status(200).json({
        //     success: true,
        //     user: {
        //         _id: req.user._id,
        //         name: req.user.name,
        //         email: req.user.email,
        //         password: req.user.password
        //     }
        // });

    } catch (error) {
        console.log("Profile error: ", error)
        return res.status(500).json({
            message: error.message || "error loading user profile"
        });
    };
};