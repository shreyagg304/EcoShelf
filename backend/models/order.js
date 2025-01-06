const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        book: {
            type: mongoose.Types.ObjectId,
            ref: "books",
            required: true,
        },
        status: {
            type: String,
            default: "Order Placed",
            enum: ["Order Placed", "Out for delivery", "Delivered", "Cancelled"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
