const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/checkAuth");
const { checkUserRole } = require("../middlewares/checkRole");
const {
  createNumber,
  updateNumber,
  deleteNumber,
  getNumber,
  getAllNumbers,
} = require("../controllers/numberController");

// Get all numbers
router.get("/", isAuth, getAllNumbers);

// Get a single number by ID
router.get("/:id", isAuth, checkUserRole("admin"), getNumber);

// Create a new number
router.post("/", isAuth, checkUserRole("admin"), createNumber);

// Update a number by ID
router.put("/:id", isAuth, checkUserRole("admin"), updateNumber);

// Delete a number by ID
router.delete("/:id", isAuth, checkUserRole("admin"), deleteNumber);

module.exports = router;
