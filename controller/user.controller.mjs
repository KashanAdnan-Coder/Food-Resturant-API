import userModel from "../model/user.model.mjs"
import asyncHandler from "express-async-handler"

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(id)
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await userModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: `${id} deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({
            success: true,
            message: "Updated Sucessfully!",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


export {
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser
}
