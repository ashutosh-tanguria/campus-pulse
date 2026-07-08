const express = require("express");
const router = express.Router();
const notices = require("../data/notices.json");

// GET all notices (supports ?search= and ?category=)
router.get("/", (req, res) => {
  try {
    const { search, category } = req.query;
    let result = [...notices];

    if (category && category.toLowerCase() !== "all") {
      result = result.filter(
        (n) => n.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notices" });
  }
});

// GET single notice by id
router.get("/:id", (req, res) => {
  try {
    const notice = notices.find((n) => n.id === req.params.id);
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notice" });
  }
});

module.exports = router;