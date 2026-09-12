import User from "../models/user.model";
import bcrypt from "bcrypt";
import { registerUserSchema } from "../validators/user.validator";

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
            // response me ham password nhi bhejenge bas user ki id or name email for security
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.log("Registration error: ", error)
        return res.status(400).json({
            message: error.message
        });
    };
};