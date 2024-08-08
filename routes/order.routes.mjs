import express from "express"
import { createOrder, getAllOrders, getSingleOrder, getUserOrders, updateOrder } from "../controller/order.controller.mjs"
import { adminRoute, authHandler } from "../middleware/auth.handler.mjs"
const router = express.Router()

router.post("/create", authHandler, createOrder)
router.get("/me", authHandler, getUserOrders)
router.get("/:id", authHandler, getSingleOrder)
router.get("/", adminRoute, getAllOrders)
router.put("/:id", adminRoute, updateOrder)

export default router   