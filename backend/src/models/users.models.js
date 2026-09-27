import mongoose from "mongoose"

let userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
},{timestamps:true});

let User = new mongoose.model("User",userSchema);

export default User;