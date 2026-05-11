const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token.js");

const {
  addDeck,
  getAllDecks,
  getOneDeck,
  updateDeck,
  deleteDeck,
} = require("../controllers/decksController.js");

router.post("/", verifyToken, addDeck);
router.get("/", verifyToken, getAllDecks);
router.get("/:deckId", verifyToken, getOneDeck);
router.put("/:deckId", verifyToken, updateDeck);
router.delete("/:deckId", verifyToken, deleteDeck);

module.exports = router;
