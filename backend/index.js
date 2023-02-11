require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
    res.send('🔥 Server is ✅ on port 3000')
})

const { launchCron } = require('./controllers/scheduler.controller')

const init = async() => {
    await launchCron()
}

init()

app.listen(3000)