import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: String,
    cover: String,
    artist: String,
    audio: String,
    color: [String],
    id: Number,
    active: Boolean
}, { collection: 'songs' })

const Song = mongoose.model('Song', songSchema)

export default Song