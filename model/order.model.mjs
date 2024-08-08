import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    shippingDetails:
    {
        address_line_1: {
            type: String,
            required: true,
        },
        address_line_2: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postal_code: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        extra_information: {
            type: String,
            required: true,
        }
    },
    pyament_completed: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    food: [
        {
            title: {
                type: String,
                required: true,
            },
            desc: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            }
        }
    ],
    sub_total: {
        type: String,
        required: true,
    },
    total_amount: {
        type: String,
        required: true,
    },
    gst: {
        type: Number,
        default: 18,
    },
    status: {
        type: String,
        default: "Processing.."
    },
    deliveryTime: {
        type: String,
        default: "minimum 15m, maximum 1h"
    }
})

const orderModel = mongoose.model("order_resturant", orderSchema)

export default orderModel