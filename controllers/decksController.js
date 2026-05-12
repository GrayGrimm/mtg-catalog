const Deck = require("../models/deck.js");
const Card = require("../models/card.js");

const addDeck = async (req, res) => {
  try {
    const { name, format, commander } = req.body;
    console.log("REQ.USER", req.user);
    console.log("REQ.BODY", req.body);
    const existingDeck = await Deck.findOne({
      user: req.user._id,
      name: name,
    });

    if (existingDeck) {
      return res.status(409).json({ err: "Deck already exists" });
    }

    const addedDeck = await Deck.create({
      user: req.user._id,
      name,
      format,
      commander,
    });

    res.status(201).json(addedDeck);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getAllDecks = async (req, res) => {
  try {
    const foundDecks = await Deck.find({ user: req.user._id });
    res.status(200).json(foundDecks);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getOneDeck = async (req, res) => {
  try {
    const foundDeck = await Deck.findOne({
      _id: req.params.deckId,
      user: req.user._id,
    });
    if (!foundDeck) {
      return res.status(404).json({ err: "Deck not found" });
    }
    res.status(200).json(foundDeck);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateDeck = async (req, res) => {
  try {
    const updatedDeck = await Deck.findByIdAndUpdate(
      { _id: req.params.deckId, user: req.user._id },
      req.body,
      { returnDocument: "after" },
    );
    if (!updatedDeck) {
      return res.status(404).json({ err: "Deck not found" });
    }
    res.status(200).json(updatedDeck);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteDeck = async (req, res) => {
  try {
    const deletedDeck = await Deck.findByIdAndDelete({
      _id: req.params.deckId,
      user: req.user._id,
    });
    if (!deletedDeck) {
      return res.status(404).json({ err: "Deck not found" });
    }
    res.status(200).json(deletedDeck);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const addCardToDeck = async (req, res) => {
  try {
    const { cardId, quantity = 1 } = req.body;

    const addedCard = await Card.findById(cardId);
    if (!addedCard) {
      return res.status(404).json({ err: "Card not found" });
    }

    const deck = await Deck.findOne({
      _id: req.params.deckId,
      user: req.user._id,
    });
    if (!deck) {
      return res.status(404).json({ err: "Deck not Found" });
    }
    const existingCard = deck.cards.find((ec) => ec.card.toString() === cardId);
    if (existingCard) {
      existingCard.quantity += quantity;
    } else {
      deck.cards.push({
        card: cardId,
        quantity,
      });
    }
    await deck.save();

    res.status(200).json(deck);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateCardQuantityInDeck = async (req, res) => {
  try {
    const { cardId, quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ err: "Quantity cannot be negative" });
    }

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ err: "Card not Found" });
    }

    const deck = await Deck.findOne({
      _id: req.params.deckId,
      user: req.user._id,
    });
    if (!deck) {
      return res.status(404).json({ err: "Deck not found" });
    }

    const cardToUpdate = deck.cards.find((c) => c.card.toString() === cardId);
    if (!cardToUpdate) {
      return res.status(404).json({ err: "Card not in deck" });
    }

    if (quantity === 0) {
      deck.cards = deck.cards.filter((c) => c.card.toString() !== cardId);
    } else {
      cardToUpdate.quantity = quantity;
    }

    await deck.save();

    res.status(200).json(deck);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  addDeck,
  getAllDecks,
  getOneDeck,
  updateDeck,
  deleteDeck,
  addCardToDeck,
  updateCardQuantityInDeck,
};
