const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let flavors = [];
let currentId = 1;

app.use(bodyParser.json());

// GET all flavors
app.get("/api/flavors", (req, res) => {
  res.json(flavors);
});

// GET a specific flavor by ID
app.get("/api/flavors/:id", (req, res) => {
  const flavor = flavors.find(f => f.id === parseInt(req.params.id));
  if (!flavor) {
    return res.status(404).json({ error: "Flavor not found" });
  }
  res.json(flavor);
});

// POST a new flavor
app.post("/api/flavors", (req, res) => {
  const { name, is_favorite } = req.body;

  if (!name || typeof is_favorite !== "boolean") {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  const newFlavor = { id: currentId++, name, is_favorite };
  flavors.push(newFlavor);
  res.status(201).json(newFlavor);
});

// PUT update a flavor
app.put("/api/flavors/:id", (req, res) => {
  const { name, is_favorite } = req.body;
  const flavor = flavors.find(f => f.id === parseInt(req.params.id));

  if (!flavor) {
    return res.status(404).json({ error: "Flavor not found" });
  }

  if (!name || typeof is_favorite !== "boolean") {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  flavor.name = name;
  flavor.is_favorite = is_favorite;
  res.json(flavor);
});

// DELETE a flavor by ID
app.delete("/api/flavors/:id", (req, res) => {
  const flavorIndex = flavors.findIndex(f => f.id === parseInt(req.params.id));
  if (flavorIndex === -1) {
    return res.status(404).json({ error: "Flavor not found" });
  }

  flavors.splice(flavorIndex, 1);
  res.status(204).send();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
