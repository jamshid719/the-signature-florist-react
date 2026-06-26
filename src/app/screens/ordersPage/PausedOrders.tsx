import React from "react";
import { TabPanel } from "@mui/lab";
import { Box } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/orders";
import { T } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobal";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";
import MemberService from "../../services/MemberService";

/** REDUX SELECTOR */

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders }),
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}
export default function PausedOrders(props: PausedOrdersProps) {
  //Retriever
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const { setValue } = props;
  const { setAuthMember, authMember, setOrderBuilder } = useGlobals();

  /**HANDLER */
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };
      const confirmation = window.confirm("Do you want to delete the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        //ORDER REBUILD(=> srazu page yangilanish mantigi)
        setOrderBuilder(new Date()); // bu degani deleteOrderHandler execute bulganda, shu execute bulgan vaqt bn yangilab olayapmiz(PS: hamda shu mantiqni basketda ham qullawimiz kk)
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      //PAYMENT PROCESS (shu mantiqdan kn ishga tushish kk =>)

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };
      const confirmation = window.confirm(
        "Do you want to proceed with payment?",
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        const member = new MemberService();
        const result = await member.getMyProfile();
        setAuthMember(result);
        //=> PROCESS ORDER
        setValue("2");
        //ORDER REBUILD(=> srazu page yangilanish mantigi)
        setOrderBuilder(new Date()); // bu degani deleteOrderHandler execute bulganda, shu execute bulgan vaqt bn yangilab olayapmiz(PS: hamda shu mantiqni basketda ham qullawimiz kk)
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"} sx={{ padding: 0 }}>
      {pausedOrders?.map((order: Order) => {
        return (
          <div key={order._id} className="order-card">
            <div className="order-top">
              <div>
                <div className="order-id">
                  #{order._id.slice(-6).toUpperCase()}
                </div>
                <div className="order-date">
                  {new Date(order.createdAt).toLocaleDateString("uz-UZ")}
                </div>
              </div>
              <div className="status-badge paused">
                <span className="status-dot paused" />
                Paused
              </div>
            </div>

            <div className="order-products">
              {order?.orderItems.map((item: OrderItem) => {
                const product: Product = order.productData.filter(
                  (ele: Product) => item.productId === ele._id,
                )[0]; //bu aynan orderItem ga tegishli bulgan productni qulga ob beradi.
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <div key={item._id} className="order-product-row">
                    <img
                      src={imagePath}
                      className={"order-product-img"}
                      alt=""
                    />

                    <div className="order-product-info">
                      <div className="order-product-name">
                        {product.productName}
                      </div>

                      <div className="order-product-qty">
                        ${" "}
                        {
                          item.itemPrice /**bu yerda productni narxidan foydalanmasdan orderItem ning narxidan foydalanamiz, sababi order rasmiylashtirayotgandagi vaqti aynan orderItemdagi narxi productning uwa vaqtdagi narxi bn shaklangan buladi. u order ning ichida saqlanadi(chunki, productning narxi uzgarish mumkin) */
                        }{" "}
                        x {item.itemQuantity}
                      </div>
                    </div>
                    <div className="order-product-price">
                      ${(item.itemQuantity * item.itemPrice).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="order-totals">
              <div className="totals-row">
                <span className="totals-label">Products</span>
                <span className="totals-val">
                  ${(order.orderTotal - order.orderDelivery).toFixed(2)}
                </span>
              </div>
              <div className="totals-row">
                <span className="totals-label">Delivery</span>
                <span className="totals-val">
                  +${order.orderDelivery.toFixed(2)}
                </span>
              </div>
              <div className="totals-row grand">
                <span className="totals-label">Total</span>
                <span className="totals-val">
                  ${order.orderTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="progress-bar">
              <div className="progress-fill paused" />
            </div>

            <div className="order-footer">
              <span className="progress-label">Order on hold — 35%</span>
              <div className="btn-wrapper">
                <button
                  value={order._id}
                  style={{
                    color: "#fafafa",
                    background: "#eb7661",
                    marginRight: "18px",
                  }}
                  className="action-btn resume"
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </button>
                <button
                  value={order._id}
                  className="action-btn resume"
                  onClick={processOrderHandler}
                >
                  Resume Order
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {!pausedOrders ||
        (pausedOrders.length === 0 && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src="/icons/noimage-list.svg"
              style={{ width: 300, height: 300 }}
              alt=""
            />
          </Box>
        ))}
    </TabPanel>
  );
}
