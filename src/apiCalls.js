export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
    .then((response) => {
      if (!response.ok) {
        throw new Error("There is an error getting the orders");
      }
      return response.json();
    })
    .then(orderData => {
      console.log(orderData.orders, "GET ORDER DATA"); 
      return orderData.orders;
    })
    .catch(err => {
      console.log(err, "ERR IN GET");
      throw err; 
    });
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