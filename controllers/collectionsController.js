const Collection = require("../models/collection.js");

const getUserCollection = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      user: req.user._id,
    }).populate("cards.card");

    if (!collection) {
      return res.status(200).json({ cards: [] });
    }

    res.status(200).json(collection);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const addCardToCollection = async (req, res) => {
  try {
    const { cardId } = req.body;

    let collection = await Collection.findOne({ user: req.user._id });

    if (!collection) {
      collection = await Collection.create({
        user: req.user._id,
        cards: [{ card: cardId, quantity: 1 }],
      });
      return res.status(201).json(collection);
    }

    const existing = collection.cards.find((c) => c.card.toString() === cardId);
    if (existing) {
      existing.quantity += 1;
    } else {
      collection.cards.push({ card: cardId, quantity: 1 });
    }

    await collection.save();
    res.status(200).json(collection);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateCardQuantity = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { quantity } = req.body;

    const collection = await Collection.findOne({ user: req.user._id });

    if (!collection) {
      return res.status(404).json({ err: "Collection not Found " });
    }

    const cardEntry = collection.cards.find(
      (c) => c.card.toString() === cardId,
    );
    if (!cardEntry) {
      return res.status(404).json({ err: "Card not found in collection" });
    }

    cardEntry.quantity = quantity;
    await collection.save();

    res.status(200).json(collection);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const removeCardFromCollection = async (req, res) => {
  try {
    const { cardId } = req.params;

    const collection = await Collection.findOne({ user: req.user._id });

    if (!collection) {
      return res.status(404).json({ err: "Collection not Found " });
    }

    collection.cards = collection.cards.filter(
      (c) => c.card.toString() !== cardId,
    );

    await collection.save();
    res.status(200).json(collection);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getUserCollection,
  addCardToCollection,
  updateCardQuantity,
  removeCardFromCollection,
};
