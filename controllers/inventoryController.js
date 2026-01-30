// controllers/inventoryController.js

async function buildInventoryDetail(req, res, next) {
  const invId = req.params.invId;

  // Example: fetch from DB (replace with your query)
  const item = { id: invId, name: "Sample Item", price: 100 };

  if (!item) {
    const error = new Error("Inventory item not found");
    error.status = 404;
    throw error;
  }

  res.json(item);
}

module.exports = { buildInventoryDetail };
