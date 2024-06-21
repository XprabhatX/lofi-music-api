import Playlist from "../model/PlaylistModel.js"

export const getAllPlaylists = async (req, res) => {
    try {

        const result = await Playlist.find()
        res.json(result)

    } catch (err) {
        console.error('Error in getAllPlaylists():', err)
        res.status(500).json({ error: 'Internal server error'})
    }
}

export const getOnePlaylist = async (req, res) => {
    try {

        const name = req.params.name
        const result = await Playlist.findOne({ name: name })
        res.json(result)

    } catch (err) {
        console.error('Error in getAllPlaylists():', err)
        res.status(500).json({ error: 'Internal server error'})
    }
}

export const insertPlaylist = async (req, res) => {
    try {

        const details = req.body
        await Playlist.insertMany([{
            name: details.name,
            songs: details.songs
        }])
        res.send('Succefully inserted')

    } catch (err) {

        console.error('Error in insertPlaylist():', err)
        res.status(500).json({ error: 'Internal server error'})
    }
}

export const deletePlaylist = async (req, res) => {
    try {
        const name = req.params.name
        await Playlist.deleteOne({ name: name })
        res.send('Successfully deleted')
    } catch (err) {
        console.error('Error in deletePlaylist():', err)
        res.status(500).json({ error: 'Internal server error'})
    }
}

export const updatePlaylist = async (req, res) => {
    try {
        const name = req.params.name;
        const updatedPlaylist = req.body;
        
        const isFirstSong = updatedPlaylist.songs.length === 1;
        const isOnlySong = updatedPlaylist.songs.length === 0;

        if (isFirstSong || isOnlySong) {
            updatedPlaylist.songs = updatedPlaylist.songs.map(song => ({ ...song, active: true }));
        }

        await Playlist.findOneAndUpdate({ name: name }, updatedPlaylist);
        res.send('Successfully updated');
    } catch (err) {
        console.error('Error in updatePlaylist():', err);
        res.status(500).json({ error: 'Internal server error'});
    }
}

export const shufflePlaylist = async (req, res) => {
    try {
        const name = req.params.name
        const playlist = await Playlist.findOne({name: name})

        if (playlist.songs.length == 0) {

            res.send('Empty playlist received.')
        } else {      
            let shuffledSongs = [...playlist.songs]
                
            const seed = new Date().getTime()
            Math.seedrandom(seed)

            // Fisher-Yates shuffle algorithm
            for (let i = shuffledSongs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]]
            }

            for (let i = 0; i < shuffledSongs.length; i++) {
                shuffledSongs[i].active = false
            }
            shuffledSongs[0].active = true

            const shuffledPlaylist = {
                _id : playlist._id,
                name : playlist.name,
                songs: shuffledSongs
            }

            await Playlist.findOneAndUpdate({name: name}, shuffledPlaylist)
            
            res.send('Successfully Shuffle ' + playlist.name)
        }
    } catch (err) {
        console.error('Error in shufflePlaylist()', err)
        res.status(500).json
    }
}