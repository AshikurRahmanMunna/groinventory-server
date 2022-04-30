const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// middleware
app.use(express.json())
app.use(cors());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d5bm4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const itemsCollection = client.db('GroInventory').collection('items');
        const reviewsCollection = client.db('GroInventory').collection('reviews');
        console.log('Database connected');
        // get all items
        app.get('/items', async (req, res) => {
            const cursor = itemsCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })
        // add an item
        app.post('/items', async (req, res) => {
            const item = req.body;
            const result = await itemsCollection.insertOne(item);
            res.send(result);
        })
        // delete an item
        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await itemsCollection.deleteOne(filter);
            res.send(result);
        })

        // get all reviews
        app.get('/reviews', async (req, res) => {
            const cursor = reviewsCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })
        // add a review
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewsCollection.insertOne(review);
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