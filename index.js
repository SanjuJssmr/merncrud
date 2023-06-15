import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Users from './Routes/Users.js'
import cors from 'cors'
dotenv.config()


const app = express()

app.use(cors());


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, { useUnifiedTopology: true })
const db = mongoose.connection

app.get('/', (req, res) => {
    res.send("This is sample")
})

db.on('error', (err) => console.error(err, 'error'))
db.once('open', () => console.log('connected to mongo db'))

app.use(express.json())
app.use('/users',Users)
 
const PORT  = 5000
app.listen(PORT, () => {
    
    console.log(`Server started on ${PORT}`);
})