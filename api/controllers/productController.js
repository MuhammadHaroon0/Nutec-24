const productModel = require("../models/productModel");
const { ratingModel } = require("../models/ratingModel");
const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");


exports.getAllProducts = catchAsync(async (req, res, next) => {
    let docs = new APIFeatures(productModel.find(), req.query)
        .filter()
        .sort()
        .paginate()
        .limitFields();
    docs = await docs.query;
    return res.status(200).json({
        status: "success",
        data: {
            products: docs,
        },
        totalPages: Math.ceil(docs.length / 10)
    });
    // return res.status(200).json(new Response("success", doc));
});

exports.getOneProduct = (...options) =>
    catchAsync(async (req, res, next) => {
        let doc;

        if (options.length == 1) {
            doc = await productModel.findById(req.params.id).populate(options[0]);
        } else if (options.length == 2)
            doc = await productModel.findById(req.params.id).populate(options[0]).populate[
                options[1]
            ];
        else doc = await product.findById(req.params.id);
        if (!doc) {
            return next(new AppError("Doc not found matching this id!", 404));
        }
        user = await userModel.findById(doc.user)
        const response = {
            status: "success",
            data: {
                data: doc,
            },

            isInWishList: user.wishList.includes(doc._id)
        }
        return res.status(200).json(response)
    });

exports.addToWishList = catchAsync(async (req, res, next) => {
    console.log(req.body.product);
    const user = await userModel.findByIdAndUpdate(req.user.id, {
        $push: {
            wishList: req.body.product
        }
    }, {
        new: true

    })
    return res.status(200).json(user)
})
exports.removeFromWishList = catchAsync(async (req, res, next) => {
    console.log(req.body.product);
    const user = await userModel.findByIdAndUpdate(req.user.id, {
        $pull: {
            wishList: req.body.product
        }
    }, {
        new: true

    })
    return res.status(200).json(user)
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const doc = await productModel.deleteOne({ _id: req.params.id });
    await ratingModel.deleteMany({ product: req.params.id });

    if (doc.deletedCount < 1) {
        return next(new AppError("Document not found matching this id!", 404));
    }
    return res.status(204).json(new Response("success", doc));
})

exports.searchProduct = catchAsync(async (req, res, next) => {

    const products = await productModel.find({
        name: { $regex: `^${req.params.letter}`, $options: 'i' }
    })
        .limit(10)

    return res.status(200).json(new Response("success", products));
})


