const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db.js");

const logger = require("morgan");

const authRouter = require("./controllers/auth");
const usersRouter = require("./controllers/users.js");
const cardsRouter = require("./controllers/cardsController.js");
const setsRouter = require("./routers/setsRouters.js");
const collectionsRouter = require("./routers/controllersRouter.js");
const decksRouter = require("./routers/decksRouter.js");

const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use("/sets", setsRouter);
app.use("/collections", collectionsRouter);
app.use("/decks", decksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
