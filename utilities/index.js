function handleErrors(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

function buildVehicleDetailHTML(vehicle) {
  const priceFormatted = vehicle.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })
  const mileageFormatted = vehicle.miles.toLocaleString("en-US")

  return `
    <section class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.image}" alt="Image of ${vehicle.make} ${vehicle.model}">
      </div>
      <div class="vehicle-info">
        <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
        <p class="price"><strong>Price:</strong> ${priceFormatted}</p>
        <p class="mileage"><strong>Mileage:</strong> ${mileageFormatted} miles</p>
        <p><strong>Description:</strong> ${vehicle.description}</p>
        <p><strong>Color:</strong> ${vehicle.color}</p>
        <p><strong>Classification:</strong> ${vehicle.classification_name}</p>
      </div>
    </section>
  `
}

module.exports = {
  handleErrors,
  buildVehicleDetailHTML
}
