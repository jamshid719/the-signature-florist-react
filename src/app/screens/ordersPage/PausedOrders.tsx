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

const pausedOrders: Order[] = [
  {
    id: "#ORD-2026-001",
    date: "Apr 18, 2026",
    products: [
      { name: "Rose Bouquet", emoji: "🌸", price: 62, qty: 2 },
      { name: "Tulip Vase", emoji: "🌷", price: 45, qty: 1 },
    ],
    delivery: 8,
  },
  {
    id: "#ORD-2026-004",
    date: "Apr 20, 2026",
    products: [{ name: "Sunflower Vase", emoji: "🌻", price: 48, qty: 1 }],
    delivery: 8,
  },
];

export default function PausedOrders() {
  return (
    <TabPanel value={"1"} sx={{ padding: 0 }}>
      {pausedOrders.map((order) => {
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
              <div className="status-badge paused">
                <span className="status-dot paused" />
                Paused
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
              <div className="progress-fill paused" />
            </div>

            <div className="order-footer">
              <span className="progress-label">Order on hold — 35%</span>
              <button className="action-btn resume">Resume Order</button>
            </div>
          </div>
        );
      })}
    </TabPanel>
  );
}
