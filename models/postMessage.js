import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creatorName: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    tags: [String],
    selectedFile: String,
    likeUserList: [
        {
            type: Schema.Types.ObjectId,
        }
    ],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;