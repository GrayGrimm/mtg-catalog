const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  cardName: { type: String, required: true },
  manaCost: { type: String, required: true },
  typeLine: { type: String, required: true },
  colors: { type: String, required: true },
  rarity: {
    type: String,
    enum: ["common", "uncommon", "rare", "mythic"],
    required: true,
  },
  setName: { type: String, required: true },
  oracleText: { type: String, required: false },
  power: { type: String, required: true },
  toughness: { type: String, required: true },
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
