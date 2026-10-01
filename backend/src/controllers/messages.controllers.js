import User from "../models/users.models.js";
import Message from "../models/messages.models.js";
import { hasImageKitConfig, uploadChatMedia } from "../lib/imagekit.js";
import { getReceiverSocketId } from "../lib/socket.js";

export async function getUserForSidebar(req, res) {
    try {
        let loggedInUserId = req.user._id;

        let filteredUser = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-clerkId");

        res.status(200).json(filteredUser);
    } catch (e) {
        console.log(`ERROR IN getUserForSidebar CONTROLLER ${e}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getconversationsForSidebar(req, res) {
    try {
        let loggedInUserId = req.user._id;
        let conversations = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { senderId: loggedInUserId },
                        { receiverId: loggedInUserId },
                    ],
                },
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ["$senderId", loggedInUserId] },
                            "$receiverId",
                            "senderId",
                        ],
                    },
                    lastMessageAt: { $max: "$createdAt" },
                },
            },
            { $sort: { lastMessageAt: -1 } },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $replaceRoot: { newRoot: { $first: "$user" } } },
            { $project: { clerkId: 0 } },
        ]);
        res.status(200).json(conversations);
    } catch (e) {
        console.log(`ERROR IN getconversationsForSidebar CONTROLLER ${e}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getMessages(req, res) {
    try {
        let { id: userToChatId } = req.params;
        let myId = req.user._id;

        let message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { receiverId: myId, senderId: userToChatId },
            ],
        }).sort({ createdAt: 1 });
        res.status(200).json(message);
    } catch (e) {
        console.log(`ERROR IN getMessages CONTROLLER ${e}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendMessages(req, res) {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        let videoUrl;

        if (req.file) {
            if (!hasImageKitConfig()) {
                return res
                    .status(500)
                    .json({ message: "Media upload is not configured" });
            }
            const url = await uploadChatMedia(req.file);
            if (req.file.mimetype.startsWith("video/")) {
                videoUrl = url;
            } else {
                imageUrl = url;
            }
        }

        if (!text?.trim() && !imageUrl && !videoUrl) {
            return res
                .status(400)
                .json({ message: "Text or media is required" });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
            video: videoUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (e) {
        console.log(`ERROR IN sendMessages CONTROLLER ${e}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


//4.37.22