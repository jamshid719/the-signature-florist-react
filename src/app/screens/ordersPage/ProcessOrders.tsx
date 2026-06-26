import React from "react";
import { TabPanel } from "@mui/lab";
import { Box } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { OrderItem, OrderUpdateInput } from "../../../lib/types/orders";
import { useGlobals } from "../../hooks/useGlobal";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

/** REDUX SELECTOR */

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders }),
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  //Retriever
  const { processOrders } = useSelector(processOrdersRetriever);
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();

  /**HANDLERS */
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      //PAYMENT PROCESS (shu mantiqdan kn ishga tushish kk =>)

      const orderId = e.target.value;
      // const orderId = e.currentTarget.value; - bu ham ishlaydi
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };
      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        //=> FINISH ORDER
        setValue("3");
        //ORDER REBUILD(=> srazu page yangilanish mantigi)
        setOrderBuilder(new Date()); // bu degani deleteOrderHandler execute bulganda, shu execute bulgan vaqt bn yangilab olayapmiz(PS: hamda shu mantiqni basketda ham qullawimiz kk)
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"2"} sx={{ padding: 0 }}>
      {processOrders?.map((order) => {
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
                In Process
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
                        $ {item.itemPrice} x {item.itemQuantity}
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
              <div className="progress-fill process" />
            </div>

            <div className="order-footer">
              <span className="progress-label">On the way — 65%</span>
              <button
                value={order._id}
                className="action-btn track"
                onClick={finishOrderHandler}
              >
                Track Order
              </button>
            </div>
          </div>
        );
      })}

      {!processOrders ||
        (processOrders.length === 0 && (
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
