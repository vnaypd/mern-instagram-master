import mongoose from "mongoose";

const instance = mongoose.Schema({
    caption: String,
    username: String,
    imageUrl: String,
    comments: [],
});

export default mongoose.model("posts", instance);

