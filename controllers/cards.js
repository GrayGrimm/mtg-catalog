const Card = require("../models/card.js");
const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const existingCard = await Card.findOne({
      cardName: req.body.cardName,
      setName: req.body.setName,
    });
    if (existingCard) {
      existingCard.quantity += 1;
      await exisitingCard.save();
      return res.status(200).json(existingCard);
    }
    const newCard = await Card.create({
      ...req.body,
      quantity: 1,
    });
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const foundCards = await Card.find();
    res.status(200).json(foundCards);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/:cardId", verifyToken, async (req, res) => {
  try {
    const foundCard = await Card.findById(req.params.cardId);
    if (!foundCard) {
      res.status(404);
      throw new Error("Card not Found");
    }
    res.status(200).json(foundCard);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

router.put("/:cardId", verifyToken, async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      req.body,
      { returnDocument: "after" },
    );
    if (!updatedCard) {
      res.status(404);
      throw new Error("Card not Found");
    }
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

router.delete("/:cardId", verifyToken, async (req, res) => {
  try {
    const removedCard = await Card.findByIdAndDelete(req.params.cardId);
    if (!removedCard) {
      res.status(404);
      throw new Error("Card not Found");
    }
    res.status(200).json(removedCard);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});
module.exports = router;
