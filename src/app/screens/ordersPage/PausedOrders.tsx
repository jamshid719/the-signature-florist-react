import React from "react";
import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { Messages, serverApi } from "../../../lib/config";
import {
  Order,
  OrderItem,
  OrderItemInput,
  OrderUpdateInput,
} from "../../../lib/types/orders";
import { T } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobal";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";

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
  const { authMember, setOrderBuilder } = useGlobals();

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
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id,
                  )[0]; //bu aynan orderItem ga tegishli bulgan productni qulga ob beradi.
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img
                        src={imagePath}
                        className={"order-dish-img"}
                        alt=""
                      />
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box className={"price-box"}>
                        <p style={{ marginRight: "15px" }}>
                          $
                          {
                            item.itemPrice /**bu yerda productni narxidan foydalanmasdan orderItem ning narxidan foydalanamiz, sababi order rasmiylashtirayotgandagi vaqti aynan orderItemdagi narxi productning uwa vaqtdagi narxi bn shaklangan buladi. u order ning ichida saqlanadi(chunki, productning narxi uzgarish mumkin) */
                          }{" "}
                        </p>
                        <img src={"/icons/close.svg"} />
                        <p style={{ margin: "0 15px" }}>{item.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product price</p>
                  <p style={{ marginLeft: "15px" }}>
                    ${order.orderTotal - order.orderDelivery}
                  </p>
                  <img src={"/icons/plus.svg"} style={{ margin: "0 15px" }} />
                  <p>Delivery cost</p>
                  <p style={{ marginLeft: "15px" }}>${order.orderDelivery}</p>
                  <img src={"/icons/pause.svg"} style={{ margin: "0 15px" }} />
                  <p>Total</p>
                  <p style={{ marginLeft: "15px" }}>${order.orderTotal}</p>
                </Box>
                <Button
                  value={order._id}
                  variant="contained"
                  color="secondary"
                  className={"cancel-button"}
                  style={{ borderRadius: "10px" }}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  variant="contained"
                  className={"pay-button"}
                  style={{ marginLeft: "64px" }}
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                style={{ width: 300, height: 300 }}
                alt=""
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
