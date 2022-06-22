const express = require("express");
const dotenv = require("dotenv");
const router = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const cors = require("cors");
const customErrorHandler = require("./middlewares/error/customErrorHandler")


const app = express();


// Middleware
dotenv.config(
    {
        path: "./config/.env"
    }
);
app.use(express.json());
app.use(cors());
app.use("/api",router)
connectDatabase();
app.use(customErrorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is listening port "+PORT)
})

