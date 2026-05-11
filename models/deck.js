const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    enum: ["Commander", "Standard", "Modern", "Legacy", "Casual"],
    default: "Commander",
  },
  commander: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    required: function () {
      return this.format === "Commander";
    },
  },
  cards: [
    {
      card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  sideboard: [
    {
      card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  notes: {
    type: String,
    default: "",
  },
});

const Deck = mongoose.model("Deck", DeckSchema);

module.exports = Deck;
