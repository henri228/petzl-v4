require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const port = process.env.API_PORT

app.get('/', async(req, res) => {
    res.send(`🔥 Server is ✅ on port ${port}`)
})

const { launchCron } = require('./controllers/scheduler.controller')

const init = async() => {
    await launchCron()
}

init()

app.listen(port, () => {
    console.log(`🔥 Server is listening on port ${process.env.API_PORT}`)
})