import React from "react";
import { TabPanel } from "@mui/lab";

interface Product {
  name: string;
  emoji: string;
  price: number;
  qty: number;
}

interface Order {
  id: string;
  date: string;
  products: Product[];
  delivery: number;
}

const processOrders: Order[] = [
  {
    id: "#ORD-2026-002",
    date: "Apr 19, 2026",
    products: [
      { name: "Peony Bouquet", emoji: "💐", price: 55, qty: 1 },
      { name: "Orchid Plant", emoji: "🌺", price: 38, qty: 2 },
    ],
    delivery: 10,
  },
  {
    id: "#ORD-2026-005",
    date: "Apr 21, 2026",
    products: [{ name: "Mixed Bouquet", emoji: "💐", price: 75, qty: 2 }],
    delivery: 12,
  },
];

export default function ProcessOrders() {
  return (
    <TabPanel value={"2"} sx={{ padding: 0 }}>
      {processOrders.map((order) => {
        const productTotal = order.products.reduce(
          (s, p) => s + p.price * p.qty,
          0,
        );
        const grand = productTotal + order.delivery;
        return (
          <div key={order.id} className="order-card">
            <div className="order-top">
              <div>
                <div className="order-id">{order.id}</div>
                <div className="order-date">{order.date}</div>
              </div>
              <div className="status-badge process">
                <span className="status-dot process" />
                In Process
              </div>
            </div>

            <div className="order-products">
              {order.products.map((p, i) => (
                <div key={i} className="order-product-row">
                  <div className="order-product-img">{p.emoji}</div>
                  <div className="order-product-info">
                    <div className="order-product-name">{p.name}</div>
                    <div className="order-product-qty">× {p.qty}</div>
                  </div>
                  <div className="order-product-price">
                    ${(p.price * p.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="totals-row">
                <span className="totals-label">Products</span>
                <span className="totals-val">${productTotal.toFixed(2)}</span>
              </div>
              <div className="totals-row">
                <span className="totals-label">Delivery</span>
                <span className="totals-val">
                  +${order.delivery.toFixed(2)}
                </span>
              </div>
              <div className="totals-row grand">
                <span className="totals-label">Total</span>
                <span className="totals-val">${grand.toFixed(2)}</span>
              </div>
            </div>

            <div className="progress-bar">
              <div className="progress-fill process" />
            </div>

            <div className="order-footer">
              <span className="progress-label">On the way — 65%</span>
              <button className="action-btn track">Track Order</button>
            </div>
          </div>
        );
      })}
    </TabPanel>
  );
}
