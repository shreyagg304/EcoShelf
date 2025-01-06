const router = require("express").Router();
const { authenticateToken } = require("./userAuth.js");
const Order = require("../models/order.js");
const User = require("../models/user.js");

// Place Order
router.post("/placeOrder", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; 
        const { order } = req.body; 

        if (!order || !Array.isArray(order)) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const savedOrder = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push: { orders: savedOrder._id },
                $pull: { cart: orderData._id },
            });
        }

        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        return res.status(500).json({ message: "An error occurred", error });
    }
});

// Get Order History for User
router.get("/getOrderHistory", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const ordersData = userData.orders.reverse(); // Reverse for latest orders
        return res.json({
            status: "Success",
            data: ordersData,
        });
    } catch (error) {
        console.error("Error in getOrderHistory:", error);
        return res.status(500).json({ message: "An error occurred", error });
    }
});

// Get All Orders (Admin)
router.get("/getAllOrders", authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("book")
            .populate("user")
            .sort({ createdAt: -1 });

        return res.json({
            status: "Success",
            data: orders,
        });
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        return res.status(500).json({ message: "An error occurred", error });
    }
});

// Update Order Status (Admin)
router.put("/updateStatus/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        await Order.findByIdAndUpdate(id, { status });
        return res.json({
            status: "Success",
            message: "Status updated successfully",
        });
    } catch (error) {
        console.error("Error in updateStatus:", error);
        return res.status(500).json({ message: "An error occurred", error });
    }
});

module.exports = router;
