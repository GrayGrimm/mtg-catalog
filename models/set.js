const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  setName: { type: String, required: true },
  setReleaseDate: { type: String },
  setSymbolUrl: { type: String },
});

const Set = mongoose.model("Set", SetSchema);
