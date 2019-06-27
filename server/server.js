const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const createRouter = require('./helpers/create_router.js')


app.use(parser.json());
app.use(cors());



MongoClient.connect('mongodb://localhost:27017')      // Stating where mongo client is going to connect to.
.then((client) => {
  const db = client.db('guests')                       // Defining which collection to connect to
  const bookingsCollection = db.collection('bookings')      //assigning collection to variable
  const bookingsRouter = createRouter(bookingsCollection)   // Makes use of router file allowing us to use RESTful routes
  app.use('/api/bookings', bookingsRouter)                  // This line tells the router where the collection is.
})
.catch(console.error)

app.listen(3000, function () {                           // Tells mongo client to listen to port 3000
  console.log(`Listening on port ${this.address().port}`);
});
