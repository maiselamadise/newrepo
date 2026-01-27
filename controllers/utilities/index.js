const utilities = {}

/* ****************************************
 * Async error handler
 * *************************************** */
utilities.handleErrors = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/* ****************************************
 * Build vehicle detail HTML
 * *************************************** */
utilities.buildVehicleDetail = function (vehicle) {
  return `
    <section class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}"
             alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      </div>

      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>

        <p class="price">
          <strong>Price:</strong>
          $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}
        </p>

        <p>
          <strong>Mileage:</strong>
          ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles
        </p>

        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      </div>
    </section>
  `
}

/* ****************************************
 * Build navigation
 * *************************************** */
utilities.getNav = async function () {
  return `
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  `
}

module.exports = utilities
