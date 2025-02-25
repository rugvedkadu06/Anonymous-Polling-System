const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const pollRoutes = require("./routes/pollRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/polls", pollRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
