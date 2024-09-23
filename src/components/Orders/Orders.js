import React from "react";
import "./Orders.css";
// import OrderElms from "../OrderElms/OrderElms";

const Orders = ({ orders }) => {
  const orderEls = orders.map((order) => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient) => {
            return <li key={ingredient}>{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <section>
      {orderEls.length ? orderEls : <p>No orders yet!</p>}
      {/* <OrderElms orders={orders} /> */}
    </section>
  );
};

export default Orders;
