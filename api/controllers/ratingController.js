const { ratingModel } = require("../models/ratingModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.getProductRatings = catchAsync(async (req, res, next) => {
  const found = await ratingModel.find({ product: req.params.productId });

  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  return res.status(200).json(new Response("success", found));
});

exports.addProductRatings = catchAsync(async (req, res, next) => {
  let found = await ratingModel.find({
    product: req.body.product,
    user: req.user.id,
  });

  if (found.length > 0) {
    return next(new AppError("Already reviewed this product!", 403));
  }
  found = await ratingModel.create({
    rating: req.body.rating,
    product: req.body.product,
    review: req.body.review,
    user: req.user.id,
  });
  // console.log(newSection._id);
  return res.status(200).json(new Response("success", found));
});
