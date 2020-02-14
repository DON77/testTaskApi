const mongoose = require('mongoose');

// TODO move connection string to env
mongoose.connect (
  'mongodb+srv://armen2020:Armen2020@cluster0-7rjch.mongodb.net/secrets_manager?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

const dbConnection = mongoose.connection;
dbConnection.on('error', error => console.log('error', error));
dbConnection.once('open', () => console.log('Connected to DB!'));
