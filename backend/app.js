const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

const user = require("./routes/user.js");
const book = require("./routes/book.js");
const favourite = require("./routes/favourite.js");
const cart = require("./routes/cart.js");
const order = require("./routes/order.js");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", favourite);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
