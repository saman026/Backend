const express = require("express");

const app = express();

//Serving static files
app.use(express.static(`${__dirname}/public`));

// 4) START SERVER
module.exports = app;
