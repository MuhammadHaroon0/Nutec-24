const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("./../utils/serverResponse");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // console.log(Model);
    const doc = await Model.find();

    return res.status(200).json(new Response("success", doc));
  });

exports.getOne = (Model, ...options) =>
  catchAsync(async (req, res, next) => {
    let doc;

    if (options.length == 1) {
      doc = await Model.findById(req.params.id).populate(options[0]);
    } else if (options.length == 2)
      doc = await Model.findById(req.params.id).populate(options[0]).populate[
        options[1]
      ];
    else doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("Doc not found matching this id!", 404));
    }
    return res.status(200).json(new Response("success", doc));
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    // console.log(doc);
    return res.status(201).json(new Response("success", doc));
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const found = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!found) {
      return next(new AppError("Document not found matching this id!", 404));
    }
    return res.status(200).json(new Response("success", found));
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteOne({ _id: req.params.id });
    if (doc.deletedCount < 1) {
      return next(new AppError("Document not found matching this id!", 404));
    }
    return res.status(204).json(new Response("success", doc));
  });
