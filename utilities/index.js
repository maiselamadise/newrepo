const Util = {}

/* ****************************************
 * Error handler wrapper
 * **************************************** */
Util.handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
 * Build inventory detail HTML
 * **************************************** */
Util.buildInventoryDetail = function (vehicle) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price)

  const mileage = new Intl.NumberFormat("en-US").format(vehicle.inv_miles)

  return `
    <section class="vehicle-detail">
      <div class="vehicle-image">
        <img 
          src="${vehicle.inv_image}" 
          alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}"
        >
      </div>

      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p class="price">${price}</p>
        <p><strong>Mileage:</strong> ${mileage} miles</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      </div>
    </section>
  `
}

/* ****************************************
 * Alias for controller use
 * **************************************** */
function buildVehicleDetail(vehicle) {
  return Util.buildInventoryDetail(vehicle)
}

async function getNav() {
  // nav logic
}

function buildClassificationGrid(data) {
  // grid logic
}

module.exports = {
  getNav,
  buildClassificationGrid,
  buildVehicleDetail,
  handleErrors: Util.handleErrors,
}
