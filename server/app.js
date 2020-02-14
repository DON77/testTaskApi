const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const schema = require('../schema/schema');
require('./database');

const app = express();
const port = 3006;

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(port, err => {
  err
    ? console.log('error in server', err)
    : console.log(`Server started on port ${port}`);
});
