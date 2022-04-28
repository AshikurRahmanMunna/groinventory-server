const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// middleware
app.use(express.json())
app.use(cors());


const port  = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('GroInventory server is running');
})

app.listen(port, (req, res) => {
    console.log('GroInventory Server is Running');
})