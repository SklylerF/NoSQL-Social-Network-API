const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// middlewear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use(routes);
// starts server and opens the connection
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for running on port ${PORT}!`);
    });
});
