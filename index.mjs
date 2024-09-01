import dotenv from 'dotenv'
dotenv.config()
import express from "express"
const app = express()
import cookieParser from 'cookie-parser'
import connectDatabase from "./config/connection.DB.mjs"
connectDatabase(process.env.MONGODB_URI)
const PORT = process.env.PORT
import authRoutes from "./routes/auth.routes.mjs"
import userRoutes from "./routes/user.routes.mjs"
import foodRoutes from "./routes/food.routes.mjs"
import reservationRoutes from "./routes/reservation.routes.mjs"
import orderRoutes from "./routes/order.routes.mjs"
import paymentRoutes from "./routes/payment.routes.mjs"
import cors from "cors"

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use("/api/food", foodRoutes)
app.use("/api/reservation", reservationRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/payment", paymentRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
})