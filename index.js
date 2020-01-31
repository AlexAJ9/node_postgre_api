const bodyParser = require('body-parser')
const express = require('express')
const dotenv = require('dotenv').config()
const db = require('./queries')
const app = express()
const port = process.env.PORTS

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/data', db.getData)
app.get('/data/:id',db.getDataByID)

app.post('/data',db.postData)
app.put('/data/:id',db.updateData)
app.delete('/data/:id',db.deleteData)

app.get('/', (req, res) => {
    res.json({ msg: 'hey' })
})

app.listen(port, () => {
    console.log(`runnin on port ${port}`)
})

