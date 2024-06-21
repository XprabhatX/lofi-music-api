import express from 'express'
import { getAllPlaylists, getOnePlaylist,insertPlaylist, deletePlaylist, updatePlaylist } from '../controllers/PlaylistControllers.js'

const router = express.Router()

router.get('/playlists', getAllPlaylists)
router.get('/playlists/:name', getOnePlaylist)
router.post('/playlists', insertPlaylist)
router.delete('/playlists/:name', deletePlaylist)
router.put('/playlists/:name', updatePlaylist)

export default router