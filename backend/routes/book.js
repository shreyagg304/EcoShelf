const router = require("express").Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth.js");
const Book = require("../models/book");

//add book - admin
router.post("/addBook", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin"){
            return res.status(500).json({ message: "You are not having access to perform admin work" });
        }
        const book = new Book ({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            genres: req.body.genres,
            pubDate: req.body.pubDate,
            pub: req.body.pub,
        });
        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//update book
router.put("/updateBook", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        // Debug log to check incoming data
        console.log("Received data for update:", req.body);

        // Convert price to number and update
        const updatedData = {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: Number(req.body.price), // Ensure price is stored as a number
            desc: req.body.desc,
            language: req.body.language,
            genres: req.body.genres,
            pubDate: req.body.pubDate,
            pub: req.body.pub,
        };

        await Book.findByIdAndUpdate(bookid, updatedData);

        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//delete book 
router.delete("/deleteBook", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occured" });
    }
});

//get all books
router.get("/getAllBooks", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured" });
    }
});

//get recently added books limit 4
router.get("/getRecentBooks", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured" });
    }
});

//get book by id
router.get("/getBookById/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured" });
    }
});

module.exports = router;