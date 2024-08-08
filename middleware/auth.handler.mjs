import jwt from "jsonwebtoken"
import userModel from "../model/user.model.mjs"

const authHandler = async (req, res, next) => {
    try {
        const { access_token } = req.cookies
        if (!access_token) {
            return res.status(401).json({
                success: false,
                message: "Please Login to access the resource!"
            })
        }
        const decoded = await jwt.verify(access_token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded)
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const adminRoute = async (req, res, next) => {
    try {
        const { access_token } = req.cookies
        if (!access_token) {
            return res.status(401).json({
                success: false,
                message: "Please Login to access the resource!"
            })
        }
        const decoded = await jwt.verify(access_token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded)
        if (user.role === "admin") {
            next()
        } else {
            res.status(401).json({
                success: false,
                message: "you are not a admin"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export { authHandler, adminRoute }