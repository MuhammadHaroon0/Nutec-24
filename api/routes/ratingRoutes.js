const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");

const { ratingModel } = require("../models/ratingModel");

const {
  getProductRatings,
  addProductRatings,
} = require("../controllers/ratingController"); //get a single course ratings

const { protect, restriction } = require("../controllers/authController");

router
  .route("/")
  .get(getAll(ratingModel))
  .post(protect, addProductRatings);

router.route("/getProductRatings/:productId").get(getProductRatings);

router
  .route("/:id")
  .get(getOne(ratingModel))
  .put(protect, restriction("admin"), updateOne(ratingModel))
  .delete(protect, restriction("admin"), deleteOne(ratingModel));

module.exports = router;
