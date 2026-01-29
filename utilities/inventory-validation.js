// src/utilities/inventory-validation.js

/**
 * Validate inventory item input
 * @param {Object} item - The inventory item object
 * @param {string} item.name - Name of the item
 * @param {string} item.description - Description of the item
 * @param {number} item.price - Price of the item
 * @param {number} item.quantity - Quantity in stock
 * @returns {Object} result - { isValid: boolean, errors: string[] }
 */
function validateInventory(item) {
  const errors = [];

  // Name validation
  if (!item.name || typeof item.name !== "string" || item.name.trim().length < 2) {
    errors.push("Item name must be at least 2 characters long.");
  }

  // Description validation
  if (!item.description || typeof item.description !== "string") {
    errors.push("Item description is required.");
  }

  // Price validation
  if (typeof item.price !== "number" || item.price <= 0) {
    errors.push("Price must be a positive number.");
  }

  // Quantity validation
  if (!Number.isInteger(item.quantity) || item.quantity < 0) {
    errors.push("Quantity must be a non-negative integer.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = { validateInventory };
