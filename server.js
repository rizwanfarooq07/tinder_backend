import express from "express";
import mongoose from "mongoose";
import Card from "./dbCards.js";
import cors from "cors";

// App config
const app = express();
const port = process.env.PORT || 8001;
const connectionUrl =
  "mongodb+srv://rizwan_07:rizwan07@cluster0.chpez.mongodb.net/tinderDB?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// DB config
mongoose.connect(connectionUrl, {
  useNewUrlParseR: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

// API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello CPs");
});

app.post("/tinder/cards", async (req, res) => {
  const dbCard = req.body;
  const newCard = new Card(dbCard);

  try {
    await newCard.save();
    res.status(200).json(newCard);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.get("/tinder/cards", async (req, res) => {
  try {
    const getCard = await Card.find();
    res.status(200).json(getCard);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Listener
app.listen(port, () => {
  console.log(`Listening on localhost: ${port}`);
});
