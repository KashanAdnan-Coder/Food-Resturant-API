import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
    },
    drinks: [
        {
            name: String,
            image: String,
            price: String,
        }
    ],
    adds_on: [
        {
            name: String,
            image: String,
            price: String,
        }
    ],
    ingredients: [
        {
            name: String,
            image: String,
        }
    ],
    image: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
    },
    numOfReviews: {
        type: Number,
    },
    reviews: [
        {
            user: {
                type: String
            },
            name: {
                type: String,
            },
            comment: {
                type: String,
            },
            rating: {
                type: String,
            }
        }]
}, { timestamps: true })

const foodModel = mongoose.model("food_resutrant", foodSchema)

export default foodModel