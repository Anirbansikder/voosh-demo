require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MONGOURI = process.env.MONGOURI;
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

const userRoute = require("./routes/user");
const authenticate = require("./middleware/authentication");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(userRoute);

mongoose.set('strictQuery', true);
mongoose.connect(MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to mongoDb database(ATLAS)");
});
mongoose.connection.on("error", err => {
    console.log("Error connecting", err);
});
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose is still disconnected");
});

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
});