const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token.js");

const {
  getUserCollection,
  addCardToCollection,
  updateCardQuantity,
  removeCardFromCollection,
} = require("../controllers/collectionsController.js");

router.get("/", verifyToken, getUserCollection);
router.post("/", verifyToken, addCardToCollection);
router.put("/:cardId", verifyToken, updateCardQuantity);
router.delete("/:cardId", verifyToken, removeCardFromCollection);

module.exports = router;
