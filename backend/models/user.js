const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg",
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        favourites: [{ type: mongoose.Types.ObjectId, ref: "books" }],
        cart: [{ type: mongoose.Types.ObjectId, ref: "books" }],
        orders: [{ type: mongoose.Types.ObjectId, ref: "order" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
