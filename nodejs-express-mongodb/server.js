const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const initializeRoutes = require("./app/routes/tutorial.routes");

var corsOptions = { 
    origin: "http://localhost:8081" 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose.connect(
    db.url, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => { console.log("Connected to database!") })
    .catch(err => { 
        console.error("Cannot connect to the database!", err);
        process.exit();
    });

initializeRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});