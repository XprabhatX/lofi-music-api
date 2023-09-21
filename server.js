import express from 'express'
import 'dotenv/config'
import mongoose from "mongoose"
import cors from 'cors'

import SongRoutes from './routes/SongRoutes.js'

const app = express();

app.use(cors())
app.get('/', (req, res) => {
    res.json({message: 'Aur bhaii!!!!'})
})


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

if (mongoose.connection.readyState) {
    console.log('🍂 connected to db')
}

app.use(SongRoutes)

app.listen(process.env.PORT || 3001, () => {
    console.log('🌐 listening server at port: ' + (process.env.PORT || 3001))
})