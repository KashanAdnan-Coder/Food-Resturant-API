import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    profile_picture: {
        type: String,
    },
    username: {
        type: String,
        maxLength: 20,
        required: true,
        minLenght: 6
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    number: {
        type: String,
        unique: true,
        minLength: 10
    },
    country_code: {
        type: String,
    },
    address_line_1: {
        type: String,
    },
    address_line_2: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })

const userModel = mongoose.model("user_resurant", userSchema)

export default userModel