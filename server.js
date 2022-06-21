const express = require("express");
const dotenv = require("dotenv");
const router = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const cors = require("cors");


const app = express();


// Middleware

app.use(express.json());
app.use(cors());

dotenv.config(
    {
        path: "./config/.env"
    }
);

app.use("/api",router)




















connectDatabase();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is listening port "+PORT)
})

