const express = require("express")
const dotenv = require("dotenv")


const app = express();

// 4 Çeşit request/response call 


let db = {
    products: [
        {
            id:"1",
            name: "iPhone 7",
            price: 500
        },        {
            id:"2",
            name: "iPhone 8",
            price: 700
        },        {
            id:"3",
            name: "iPhone X",
            price: 800
        },        {
            id:"4",
            name: "iPhone 11",
            price: 1000
        },

    ]
}

app.get("/",(req,res) => {
    res.json({
        success: true,
        message: "Hello world!",
        data: db
    })
}

)

// Middleware

app.use(express.json());

dotenv.config(
    {
        path: "./config/.env"
    }
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is listening port "+PORT)
})

