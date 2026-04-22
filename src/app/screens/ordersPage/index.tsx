import { SyntheticEvent, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");
  const [payMethod, setPayMethod] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const member = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 012-3456",
    address: "123 Botanical Lane, Flower District, NY 10012",
    emoji: "🌸",
  };

  return (
    <div className="orders-page">
      <Container>
        <div className="orders-header">
          <h2>My Orders</h2>
          <p>Track and manage your flower orders</p>
        </div>

        <div className="orders-layout">
          {/* ── LEFT PANEL ── */}
          <div className="orders-left">
            {/* Member card */}
            <div className="member-card">
              <div className="member-avatar">{member.emoji}</div>
              <div className="member-name">{member.name}</div>
              <div className="member-email">{member.email}</div>
              <div className="member-divider" />

              <div className="member-info-row">
                <div className="member-info-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="member-info-label">Phone</div>
                  <div className="member-info-val">{member.phone}</div>
                </div>
              </div>

              <div className="member-info-row">
                <div className="member-info-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="member-info-label">Address</div>
                  <div className="member-info-val">{member.address}</div>
                </div>
              </div>
            </div>

            {/* Payment card */}
            <div className="payment-card">
              <div className="payment-title">Payment Method</div>

              <div className="payment-methods">
                {[
                  { label: "Visa", color: "#1a1f71" },
                  { label: "MC", color: "#eb001b" },
                  { label: "PP", color: "#003087" },
                  { label: "WU", color: "#f5a623" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className={`pay-icon${payMethod === i ? " active" : ""}`}
                    onClick={() => setPayMethod(i)}
                  >
                    <svg viewBox="0 0 48 24" style={{ width: 36 }}>
                      <rect
                        width="48"
                        height="24"
                        rx="4"
                        fill={payMethod === i ? "#f0faf5" : "#f9f9f9"}
                      />
                      <text
                        x="50%"
                        y="16"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fill={m.color}
                        fontFamily="Jost,Arial"
                      >
                        {m.label}
                      </text>
                    </svg>
                  </div>
                ))}
              </div>

              <div className="card-form">
                <div className="card-field">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="card-field">
                  <label>Card Holder</label>
                  <input type="text" placeholder="Sarah Johnson" />
                </div>
                <div className="card-row">
                  <div className="card-field">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM / YY" maxLength={7} />
                  </div>
                  <div className="card-field">
                    <label>CVV</label>
                    <input type="text" placeholder="•••" maxLength={3} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="orders-right">
            <div className="orders-tabs-wrap">
              <TabContext value={value}>
                <div className="orders-tab-header">
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="orders tabs"
                      variant="scrollable"
                      scrollButtons={false}
                    >
                      <Tab label="Paused" value={"1"} />
                      <Tab label="In Process" value={"2"} />
                      <Tab label="Finished" value={"3"} />
                    </Tabs>
                  </Box>
                </div>
                <div className="orders-tab-content">
                  <PausedOrders />
                  <ProcessOrders />
                  <FinishedOrders />
                </div>
              </TabContext>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
