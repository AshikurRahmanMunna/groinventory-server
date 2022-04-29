const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// middleware
app.use(express.json())
app.use(cors());

// GroInventory
// 1W81oie5MohmnHgE


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d5bm4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const productCollection = client.db('GroInventory').collection('products');
        console.log('Database connected');
    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir);

const port  = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('GroInventory server is running');
})

app.listen(port, (req, res) => {
    console.log('GroInventory Server is Running');
})