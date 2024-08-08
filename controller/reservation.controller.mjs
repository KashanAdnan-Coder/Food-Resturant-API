import asyncHandler from "express-async-handler";
import resrvationModel from "../model/reservation.model.mjs";
import generateUniqueRandomTimes from "../utils/generate.unique.time.mjs"

const createReservation = asyncHandler(async (req, res) => {
    try {
        const { seat } = req.body
        if (seat > 20) {
            return res.status(200).json({
                success: true,
                message: `20 Seats are maximum value. If you want seats so you have to get another seat reservation.`
            })
        }

        const startTime = new Date();
        startTime.setHours(10, 0, 0, 0); // 10:00:00 AM
        const endTime = new Date();
        endTime.setHours(13, 0, 0, 0); // 01:00:00 PM
        const uniqueRandomTimes = generateUniqueRandomTimes(startTime, endTime, 10);
        const number = Math.round(Math.random() * uniqueRandomTimes.length - 2)
        const time = uniqueRandomTimes[number]

        const reservation = await resrvationModel.create({
            ...req.body,
            time,
            userId: req.user._id,
            username: req.user.username,
            email: req.user.email,

        })

        res.status(201).json({
            success: true,
            message: `Seats are Reserved By ${req.user.username}, for this time: ${time} PM`,
            reservation
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getAllReservation = asyncHandler(async (req, res) => {
    try {
        const reservations = await resrvationModel.find({})
        res.status(200).json({
            success: true,
            reservations
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getSingleReservation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const reservation = await resrvationModel.findById(id)
        res.status(200).json({
            success: true,
            reservation
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const deleteReservation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        await resrvationModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: `reservation seat no:${id} deleted successfully`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const updateReservation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const updatedReservation = await resrvationModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        res.status(200).json({
            success: true,
            message: "Reservation Updated Successfully!",
            updatedReservation
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const getUserReservation = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id.toString()

        const reservations = await resrvationModel.find({})
        const userReservations = reservations.filter((rev) => rev.userId === userId)

        res.status(200).json({
            success: true,
            userReservations
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

const cancelReservation = asyncHandler(async (req, res) => {
    try {
        const user = req.user
        const reservation = await resrvationModel.findOneAndUpdate({
            userId: user._id.toString()
        }, { cancelled: true })
        res.status(200).json({
            success: true,
            message: `Reservation Seat no :${reservation._id} has been cancelled by ${user._id.toString()}`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export {
    createReservation,
    getAllReservation,
    getSingleReservation,
    deleteReservation,
    updateReservation,
    getUserReservation,
    cancelReservation
}