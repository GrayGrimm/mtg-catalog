const Set = require("../models/set.js");

const addSet = async (req, res) => {
  try {
    const addedSet = await Set.create(req.body);
    res.status(200).json(addedSet);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getAllSets = async (req, res) => {
  try {
    const foundSets = await Set.find();
    res.status(200).json(foundSets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getOneSet = async (req, res) => {
  try {
    const set = await Set.findById(req.params.setId);

    if (!set) {
      return res.status(404).json({ err: "Set not found" });
    }
    res.status(200).json(set);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateSet = async (req, res) => {
  try {
    const updatedSet = await Set.findByIdAndUpdate(req.params.setId, req.body, {
      returnDocument: "after",
    });
    if (!updatedSet) {
      return res.status(404).json({ err: "Set not found" });
    }
    res.status(200).json(updatedSet);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteSet = async (req, res) => {
  try {
    const deletedSet = await Set.findByIdAndDelete(req.params.setId);

    if (!deletedSet) {
      return res.status(404).json({ err: "Set not found" });
    }
    res.status(200).json(deletedSet);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  addSet,
  getAllSets,
  getOneSet,
  updateSet,
  deleteSet,
};
