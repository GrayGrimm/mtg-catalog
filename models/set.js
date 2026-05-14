const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  releaseDate: { type: String },
  symbolUrl: { type: String },
});

const Set = mongoose.model("Set", SetSchema);

module.exports = Set;
