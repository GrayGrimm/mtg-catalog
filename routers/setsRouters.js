const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const router = express.Router();

const {
  addSet,
  getAllSets,
  getOneSet,
  updateSet,
  deleteSet,
} = require("../controllers/setsController.js");

router.post("/", verifyToken, addSet);
router.get("/", verifyToken, getAllSets);
router.get("/:setId", verifyToken, getOneSet);
router.put("/:setId", verifyToken, updateSet);
router.delete("/:setId", verifyToken, deleteSet);

module.exports = router;
