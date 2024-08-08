import express from "express"
const router = express.Router()
import { adminRoute, authHandler } from "../middleware/auth.handler.mjs"
import { addRating, createFood, deleteFood, deleteReviews, getAllFoods, getAllReveiws, getSingleFood, updateFood } from "../controller/food.controller.mjs"

router.post("/create", adminRoute, createFood)
router.get("/", getAllFoods)
router.delete("/:id", adminRoute, deleteFood)
router.get("/:id", getSingleFood)
router.put("/:id", adminRoute, updateFood)
router.post("/rating", authHandler, addRating)
router.get("/ratings/:id", authHandler, getAllReveiws)
router.delete("/review/rating", authHandler, deleteReviews)

export default router