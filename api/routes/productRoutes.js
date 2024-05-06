const express = require("express");
const router = express.Router();
const {
    updateOne,
    getOne,
    getAll,
    createOne,
} = require("../controllers/handlerFactory");

const { deleteProduct, searchProduct, getAllProducts, getOneProduct, addToWishList, removeFromWishList } = require("../controllers/productController");
const { protect } = require("../controllers/authController");
const productModel = require("../models/productModel");
router.route("/").post(protect, createOne(productModel))
    .get(getAllProducts)


router.
    route("/search/:letter").
    get(searchProduct)

router.
    route("/addToWishList").
    patch(protect, addToWishList)
router.
    route("/removeFromWishList").
    patch(protect, removeFromWishList)

router.route("/:id")
    .get(getOneProduct("ratings"))
    .delete(protect, deleteProduct)
    .patch(updateOne(productModel))


module.exports = router;
