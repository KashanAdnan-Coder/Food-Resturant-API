import asyncHandler from "express-async-handler"
import userModel from "../model/user.model.mjs"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generate.token.mjs"
import mongoose from "mongoose"

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, password, number, country_code } = req.body
        const emailExist = await userModel.findOne({ email })
        if (emailExist) {
            return res.status(400).json({
                success: false,
                message: "Email Already Exists!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 8)
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            number,
            country_code
        })

        res.status(201).json({
            success: true,
            message: `Account Registered for ${username}. Created Successfully!`,
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { number, email, password } = req.body
        if (!number) {
            const emailExist = await userModel.findOne({ email })
            if (!emailExist) {
                return res.status(400).json({
                    success: false,
                    message: "User not found!"
                })
            }
            const isCorrectPassword = await bcrypt.compare(password, emailExist.password)
            if (!isCorrectPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Credientials are incorrect!"
                })
            }
            console.log(emailExist);
            const id = new mongoose.Types.ObjectId(emailExist._id)

            const token = await generateToken(id.toString())
            res.status(200).cookie("access_token", token).json({
                success: true,
                message: "User logged in!",
                user: emailExist,
                token: token
            })
        } else {
            const numberExist = await userModel.findOne({ number })
            if (!numberExist) {
                return res.status(400).json({
                    success: false,
                    message: "User not found!"
                })
            }
            const isCorrectPassword = await bcrypt.compare(password, numberExist.password)
            if (!isCorrectPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Credientials are incorrect!"
                })
            }
            const id = new mongoose.Types.ObjectId(numberExist._id)

            const token = await generateToken(id.toString())
            res.cookie("access_token", token).status(200).json({
                success: true,
                message: "User logged in!",
                user: numberExist,
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const logout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("access_token")
        res.status(200).json({
            success: true,
            message: "Logout Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export {
    registerUser,
    loginUser,
    logout
}