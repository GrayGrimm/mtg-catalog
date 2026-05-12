const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token.js");

const {
  addDeck,
  getAllDecks,
  getOneDeck,
  updateDeck,
  deleteDeck,
  addCardToDeck,
  updateCardQuantityInDeck,
} = require("../controllers/decksController.js");

router.post("/", verifyToken, addDeck);
router.get("/", verifyToken, getAllDecks);
router.get("/:deckId", verifyToken, getOneDeck);
router.put("/:deckId", verifyToken, updateDeck);
router.delete("/:deckId", verifyToken, deleteDeck);

router.post("/:deckId/cards", verifyToken, addCardToDeck);
router.put("/:deckId/cards", verifyToken, updateCardQuantityInDeck);

module.exports = router;
