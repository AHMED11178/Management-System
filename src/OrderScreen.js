// src/OrderScreen.js
import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

const OrderScreen = () => {
  const [orders, setOrders] = useState({ preparing: [], ready: [] });

  // Listen for incoming order updates from kiosk and kitchen
  useEffect(() => {
    // Listen for new orders from kiosk
    ipcRenderer.on('order-preparing', (event, orderId) => {
      setOrders(prevState => ({
        ...prevState,
        preparing: [...prevState.preparing, orderId]
      }));
    });

    // Listen for orders marked as ready from kitchen
    ipcRenderer.on('order-ready', (event, orderId) => {
      setOrders(prevState => ({
        ...prevState,
        preparing: prevState.preparing.filter(id => id !== orderId),
        ready: [...prevState.ready, orderId]
      }));
    });

    // Listen for completed orders to remove them from the screen
    ipcRenderer.on('order-completed', (event, orderId) => {
      setOrders(prevState => ({
        preparing: prevState.preparing.filter(id => id !== orderId),
        ready: prevState.ready.filter(id => id !== orderId)
      }));
    });

    // Clean up listeners on unmount
    return () => {
      ipcRenderer.removeAllListeners('order-preparing');
      ipcRenderer.removeAllListeners('order-ready');
      ipcRenderer.removeAllListeners('order-completed');
    };
  }, []);

  return (
    <div>
      <h1>Order Status</h1>
      <section>
        <h2>Preparing</h2>
        <ul>
          {orders.preparing.map(orderId => (
            <li key={orderId}>Order #{orderId}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Ready</h2>
        <ul>
          {orders.ready.map(orderId => (
            <li key={orderId}>Order #{orderId}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default OrderScreen;
