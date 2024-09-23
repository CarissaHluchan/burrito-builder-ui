import { useEffect, useState } from "react";

import "./App.css";
import { getOrders, postOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    getOrders()
    .then(orderData => {
      console.log(orderData, "order data in useEffect")
      if (orderData && orderData.length) {
        setOrders(orderData);
      } else {
        setOrders([]);
      }
    })
    .catch((err) => {
      console.error("Error fetching:", err)
      setError('There was an error loading the orders')
    });
  }, []);

  const addOrder = (newOrder) => {
    postOrders(newOrder)
    .then(returnedData => {
      if (returnedData) {
        setOrders([...orders, returnedData])
      }
    })
    .catch(err => {
      console.log(err , "err in addIdea")
      setError('There was an error adding your order')
    })
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        {error && <p className="error-message">{error}</p>}
        <OrderForm addOrder={addOrder}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
