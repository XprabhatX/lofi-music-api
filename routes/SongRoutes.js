import express from 'express'
import { getAllSongs } from "../controllers/SongControllers.js"

const router = express.Router()

router.get('/getSongs', getAllSongs)

export default router