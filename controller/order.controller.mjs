import asyncHandler from "express-async-handler";
import orderModel from "../model/order.model.mjs";

const createOrder = asyncHandler(async (req, res) => {
    try {
        const order = await orderModel.create({ ...req.body, userId: req.user._id.toString(), username: req.user.username })
        res.status(201).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getUserOrders = asyncHandler(async (req, res) => {
    try {
        const order = await orderModel.findOne({ userId: req.user._id.toString() })

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getSingleOrder = asyncHandler(async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id)
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const order = await orderModel.find({})
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const updateOrder = asyncHandler(async (req, res) => {
    try {
        const updated_order = await orderModel.findByIdAndUpdate(req.params.id, { ...req.body })

        res.status(200).json({
            success: true,
            message: "Order Updated Succesfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export {
    createOrder,
    getUserOrders,
    getSingleOrder,
    getAllOrders,
    updateOrder
}