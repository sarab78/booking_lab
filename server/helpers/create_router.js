const express = require('express');
const ObjectId = require('mongodb').ObjectID;

const createRouter = function(collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err})
    })
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id
    collection
    .findOne({_id: ObjectId(id)})
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err})
    })
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id
    collection
    .deleteOne({_id: ObjectId(id)})
    .then((result) => res.json(result))
    .then(() => collection.find().toArray()) //if need back again
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err})
    })

  })

  router.post('/', (req,res) => {
    const newData = req.body;
    collection
    .insertOne(newData)
    .then((result) => {
      res.json(result.ops[0])
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err})
    })
  })

  router.put('/:id', (req, res) => {
      console.log(req.body);
    const id = req.params.id
    const updateData = req.body
    delete updateData._id
    collection
    .findOneAndUpdate(
      {_id: ObjectId(id)},
      {$set: updateData},
      {returnOriginal: false}
    )
    .then((result) => res.json(result))

  .catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ status: 500, error: err})
  })
})


  return router
}

module.exports = createRouter
