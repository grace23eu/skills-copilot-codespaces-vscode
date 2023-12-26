// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const comments = require('./comments');

const PORT = 4001;
const app = express();

// Use morgan logger
app.use(morgan('dev'));

// Use body-parser middleware
app.use(bodyParser.json());

// Set up the path and handler functions for the endpoints
app
  .route('/comments')
  .get((req, res) => {
    res.status(200).send(comments);
  })
  .post((req, res) => {
    const { body } = req;
    comments.push(body);
    res.status(201).send(body);
  });

app
  .route('/comments/:id')
  .get((req, res) => {
    const { id } = req.params;
    const comment = comments.find(comment => comment.id === Number(id));
    res.status(200).send(comment);
  })
  .put((req, res) => {
    const { id } = req.params;
    const { body } = req;
    const commentIndex = comments.findIndex(comment => comment.id === Number(id));
    comments[commentIndex] = body;
    res.status(200).send(body);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const commentIndex = comments.findIndex(comment => comment.id === Number(id));
    comments.splice(commentIndex, 1);
    res.status(204).send();
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});