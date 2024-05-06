const express = require("express");
const router = express.Router();
const {
    updateOne,
    getOne,
    getAll,
    createOne,
    deleteOne,
} = require("../controllers/handlerFactory");

const orderModel = require("../models/orderModel");
const { } = require("../controllers/orderController");
const { protect } = require("../controllers/authController");
router.route("/").post(protect, createOne(orderModel))
    .get(getAll(orderModel))


router.route("/:id")
    .get(getOne(orderModel, "orderItems"))
    .delete(protect, deleteOne(orderModel))
    .patch(updateOne(orderModel))


module.exports = router;
