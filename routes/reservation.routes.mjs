import express from "express"
import { cancelReservation, createReservation, deleteReservation, getAllReservation, getSingleReservation, getUserReservation, updateReservation } from "../controller/reservation.controller.mjs"
import { adminRoute, authHandler } from "../middleware/auth.handler.mjs"

const router = express.Router()

router.get("/", adminRoute, getAllReservation)
router.get("/me", authHandler, getUserReservation)
router.get("/:id", authHandler, getSingleReservation)
router.post("/create", authHandler, createReservation)
router.put("/:id", authHandler, updateReservation)
router.put("/cancel/:id", authHandler, cancelReservation)
router.delete("/:id", authHandler, deleteReservation)

export default router   