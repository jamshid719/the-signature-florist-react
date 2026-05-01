import React from "react";
import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/orders";

/** REDUX SELECTOR */

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders }),
);

export default function FinishedOrders() {
  //Retriever
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <TabPanel value={"3"} sx={{ padding: 0 }}>
      {finishedOrders?.map((order) => {
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
                Finished
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
              <div className="progress-fill finished" />
            </div>

            <div className="order-footer">
              <span className="progress-label">Delivered — 100%</span>
              <button className="action-btn review">Leave Review</button>
            </div>
          </div>
        );
      })}

      {!finishedOrders ||
        (finishedOrders.length === 0 && (
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
