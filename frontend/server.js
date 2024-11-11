"use strict";

const express = require("express");
const bodyParserErrorHandler = require("express-body-parser-error-handler");
const { urlencoded, json } = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

app.disable("x-powered-by");
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(bodyParserErrorHandler());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
