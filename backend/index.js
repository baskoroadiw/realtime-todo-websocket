const express = require('express');
const app = express()

const server = require('http').createServer(app);

app.get('/', (req, res) => {
    res.send('Server Running...!')
})

const port = 3000
server.listen(port, (err) => {
    if (err) console.log(err)
    console.log(`Server listening on port ${port}`)
})