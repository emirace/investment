const Number = require("../models/Number");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

// Create a new number
exports.createNumber = asyncErrorHandler(async (req, res, next) => {
  const { value } = req.body;

  if (!value) {
    return next(new CustomError("Value is required", 400));
  }

  const newNumber = await Number.create({ value });

  res.status(201).json({
    status: "success",
    data: { number: newNumber },
  });
});

// Get a specific number by ID
exports.getNumber = asyncErrorHandler(async (req, res, next) => {
  const number = await Number.findById(req.params.id);

  if (!number) {
    return next(new CustomError("Number not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { number },
  });
});

// Get all numbers
exports.getAllNumbers = asyncErrorHandler(async (req, res, next) => {
  const numbers = await Number.find();

  res.status(200).json({
    status: "success",
    numbers,
  });
});

// Update a specific number by ID
exports.updateNumber = asyncErrorHandler(async (req, res, next) => {
  const { value } = req.body;

  if (value === undefined) {
    return next(new CustomError("Value is required", 400));
  }

  const updatedNumber = await Number.findByIdAndUpdate(
    req.params.id,
    { value },
    { new: true, runValidators: true }
  );

  if (!updatedNumber) {
    return next(new CustomError("Number not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { number: updatedNumber },
  });
});

// Delete a specific number by ID
exports.deleteNumber = asyncErrorHandler(async (req, res, next) => {
  const number = await Number.findByIdAndDelete(req.params.id);

  if (!number) {
    return next(new CustomError("Number not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
