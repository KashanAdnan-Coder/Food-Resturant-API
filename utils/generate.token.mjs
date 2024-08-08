import jwt from "jsonwebtoken"

const generateToken = async (data) => {
    const token = await jwt.sign(data, process.env.JWT_SECRET)
    return token
}

export default generateToken