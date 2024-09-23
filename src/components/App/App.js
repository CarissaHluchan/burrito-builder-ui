import { useEffect, useState } from "react";

import "./App.css";
import { getOrders, postOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
    .then(orderData => {
      console.log(orderData, "order data in useEffect")
      if (orderData && orderData.length) {
        setOrders(orderData)
      } else {
        setOrders([])
      }
    })
    .catch((err) => console.error("Error fetching:", err));
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
    })
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
