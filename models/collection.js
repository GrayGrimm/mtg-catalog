const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cards: [
    {
      card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Collection = mongoose.model("Collection", CollectionSchema);
module.exports = Collection;
