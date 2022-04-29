const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// middleware
app.use(express.json())
app.use(cors());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d5bm4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const itemsCollection = client.db('GroInventory').collection('items');
        console.log('Database connected');
        app.get('/items', async (req, res) => {
            const cursor = itemsCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/items', async (req, res) => {
            const item = req.body;
            const result = await itemsCollection.insertOne(item);
            res.send(result);
        })
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