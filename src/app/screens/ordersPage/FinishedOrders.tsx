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

const finishedOrders: Order[] = [
  {
    id: "#ORD-2026-003",
    date: "Apr 20, 2026",
    products: [
      { name: "Red Rose", emoji: "🌹", price: 30, qty: 3 },
      { name: "Daisy Bunch", emoji: "🌼", price: 22, qty: 2 },
    ],
    delivery: 6,
  },
  {
    id: "#ORD-2026-006",
    date: "Apr 21, 2026",
    products: [
      { name: "Pink Tulip Vase", emoji: "🌷", price: 52, qty: 1 },
      { name: "Pink Rose", emoji: "🌹", price: 28, qty: 2 },
    ],
    delivery: 6,
  },
];

export default function FinishedOrders() {
  return (
    <TabPanel value={"3"} sx={{ padding: 0 }}>
      {finishedOrders.map((order) => {
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
              <div className="status-badge finished">
                <span className="status-dot finished" />
                Finished
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
              <div className="progress-fill finished" />
            </div>

            <div className="order-footer">
              <span className="progress-label">Delivered — 100%</span>
              <button className="action-btn review">Leave Review</button>
            </div>
          </div>
        );
      })}
    </TabPanel>
  );
}
