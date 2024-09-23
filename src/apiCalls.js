export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
  .then((response) => {
    if (!response.ok) {
      throw new Error("there is an Error getting the order")
    }
    return response.json()
  })
  .then( orderData => {
    console.log(orderData, "GET ORDER DATA")
    return orderData
  })
  .catch(err => {
    console.log(err, "ERR IN GET")
  })
};

export const postOrders = (newOrder) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-type': 'application/json',
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('There was an error adding the order')
    }
    return response.json()
  })
  .catch(err => {
    console.log(err, "ERR IN POST")
  })
}