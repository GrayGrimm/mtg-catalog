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
module.exports = router;
