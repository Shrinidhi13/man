const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const app = express();
const port = process.env.port || 3000;
const fs = require('fs').promises;

const connection_string = 'mongodb+srv://Shrinidhi:Shri@crud.8vx9pff.mongodb.net/users';
const database_name = 'users';
const collection_name = 'agents';

app.get('/', (req, res) => {
    // Serve the HTML file when accessing the root URL <button class="delete-button" data-id="${doc._id}">Delete</button>
    res.sendFile(__dirname + '/index.html');
});

app.get('/getData', async (req, res) => {
    try {
        const client = await MongoClient.connect(connection_string);
        const db = client.db(database_name);
        const collection = db.collection(collection_name);

        const documents = await collection.find().toArray();

        const renderedHtml = documents.map(doc => `
            <div>
                <h2>Name: ${doc.name}</h2>
                <p>Surname: ${doc.surname}</p>
                <p>Email: ${doc.email}</p>
                <p>Need: ${doc.need}</p>
                <p>Message: ${doc.message}</p>
                <p>PDF File: ${doc.pdfFile}</p>
                <p>User Type: ${doc.user}</p>
                <p>If choosen other: ${doc['other choice']}</p>
                

            </div>
            <hr>
        `).join('');

        res.send(renderedHtml);

        client.close();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});



