const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { MongoClient } = require('mongodb');
const dbOperations = require('./operations');

const url = 'mongodb://localhost:27017';
const dbName = 'conFusion';

MongoClient.connect(url)
  .then((client) => {
    console.log('Connected correctly to server');

    const db = client.db(dbName);
    // const collection = db.collection('dishes');
    // collection.insertOne({"name": "Vetki Paturi", "description": "Awasome"}, (err, result) => {
    //     assert.equal(err, null);

    //     console.log("After Insert:\n");
    //     console.log(result);

    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err, null);

    //         console.log("Found:\n");
    //         console.log(docs);

    //         db.dropCollection('dishes', (err, result) => {
    //             assert.equal(err, null);

    //             console.log("Collection successfully dropped.\n");
    //             client.close();
    //         });
    //     });
    // });

    dbOperations
      .insertDocument(
        db,
        { name: 'Tandori Chicken', description: 'Test' },
        'dishes'
      )
      .then((result) => {
        console.log('Insert Document:\n', result);
        return dbOperations.findDocuments(db, 'dishes');
      })
      .then((docs) => {
        console.log('Found Documents:\n', docs);

        return dbOperations.updateDocument(
          db,
          { name: 'Tandori Chicken' },
          { description: 'update Test' },
          'dishes'
        );
      })
      .then((result) => {
        console.log('Updated Document:\n', result);

        return dbOperations.findDocuments(db, 'dishes');
      })
      .then((docs) => {
        console.log('Found Documents:\n', docs);

        return dbOperations.removeDocument(
          db,
          { name: 'Tandori Chicken' },
          'dishes'
        );
      })
      .then((result) => {
        console.log('Dropped Collection:\n', result);
        client.close();
      });
  })
  .catch((err) => console.log(err));
