const express = require("express");
const router = express.Router();
const events = require("../data/events.json");

// GET all events (supports ?search= and ?category=)
router.get("/", (req, res) => {
  try {
    const { search, category } = req.query;
    let result = [...events];

    if (category && category.toLowerCase() !== "all") {
      result = result.filter(
        (e) => e.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.tagline.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET single event by id
router.get("/:id", (req, res) => {
  try {
    const event = events.find((e) => e.id === req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

module.exports = router;