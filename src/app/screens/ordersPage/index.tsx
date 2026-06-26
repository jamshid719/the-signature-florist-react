import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../../lib/types/orders";
import { useDispatch } from "react-redux";
import { useGlobals } from "../../hooks/useGlobal";
import { useHistory } from "react-router-dom";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/** REDUX SLICE */

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());

  const { orderBuilder, setOrderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");

  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data)) //redux storega joyladik
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data)) //redux storega joyladik
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data)) //redux storega joyladik
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /**HANDLERS */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  if (!authMember) history.push("/");

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
              <img
                className="member-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/img/default-user.png"
                }
              />

              <div className="member-name">{authMember?.memberNick}</div>
              <div className="member-email">
                {authMember?.memberStatus ? MemberType.USER : "-"}
              </div>
              <div className="member-divider" />

              <div className="member-info-row">
                <div className="member-info-icon">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="member-info-label">Phone</div>
                  <div className="member-info-val">
                    {authMember?.memberPhone}
                  </div>
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
                  <div className="member-info-val">
                    {authMember?.memberAddress ?? "No address"}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment card */}
            <div className="payment-card">
              <div className="payment-title">Payment Method</div>

              <div className="payment-methods">
                <Box className={"payment-methods"}>
                  <img src="/icons/western-card.svg" alt="" />
                  <img src="/icons/master-card.svg" alt="" />
                  <img src="/icons/paypal-card.svg" alt="" />
                  <img src="/icons/visa-card.svg" alt="" />
                </Box>
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
                  <PausedOrders setValue={setValue} />
                  <ProcessOrders setValue={setValue} />
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
