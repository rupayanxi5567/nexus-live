import mongoose from "mongoose";

let messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
        video: {
            type: String,
        },
    },
    { timestamps: true },
);

let Message = new mongoose.model("Message", messageSchema);

export default Message;
