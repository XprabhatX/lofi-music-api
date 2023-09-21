import Song from "../model/SongModel.js";

export const getAllSongs = async(req, res) => {
    try {
        const result = await Song.find()
        res.json(result)
        console.log('reached controller\n' + result)
    } catch (err) {
        console.error('Error in getAllSongs():', err)
        res.status(500).json({ error: 'Internal server error'})
    }
}