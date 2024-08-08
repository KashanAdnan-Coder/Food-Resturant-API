import mongoose from "mongoose";

const connectDatabase = (uri) => {
    mongoose.connect(uri).then((res) => {
        console.log(`MongoDB Connected!`);
    }).catch(() => {
        console.log(`MongoDB Facing Error!`);
    })
}

export default connectDatabase