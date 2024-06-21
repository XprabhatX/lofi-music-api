import mongoose from "mongoose"

const playlistSchema = new mongoose.Schema({
    name: String,
    songs: [Object]
}, { collection: 'playlists' })

const Playlist = mongoose.model('Playlist', playlistSchema)

export default Playlist