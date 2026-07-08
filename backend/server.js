const express = require("express");
const cors = require("cors");
require("dotenv").config();

const noticesRoutes = require("./routes/notices");
const eventsRoutes = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/notices", noticesRoutes);
app.use("/api/events", eventsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Campus Pulse API is running" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});