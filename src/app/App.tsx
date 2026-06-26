import React, { useState } from "react";

import { Box, Button, Container, Stack, Typography } from "@mui/material";

import { Switch, Route, Link, useLocation } from "react-router-dom";

import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HelpPage from "./screens/helpPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/Footer";

import Test from "./screens/test";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import { T } from "../lib/types/common";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobal";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/chatWidget.css";
import ChatWidget from "./components/ChatWidget";

function App() {
  const location = useLocation(); //react-router-dom ning hook
  console.log("Location:", useLocation());

  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();

  //SignUp & login useStatelari
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  //bu logout un state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); //anchorEl-qayerdan ochilsin, (btn bulishi mumkin yo bowqa el.) => biz buni Menu da ishlatamiz.

  /**HANDLERS */
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  //logout mantiglari
  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }; // e.currentTarget	bosilgan element(btn bulishi mumkin yo bowqa el. yani shu anchorEl uzi)

  const handleCloseLogout = () => setAnchorEl(null); // yopish

  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout(); // localStorage + cookie tozalaydi
      await sweetTopSuccessAlert("success", 1000);
      setAuthMember(null); // React state tozalaydi & UI darxol yangilanadi.(browserni refresh qilmasa ham).
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll} /* rendering*/
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          {/* <Test /> */}
          <HomePage />
        </Route>
      </Switch>
      <Footer />{" "}
      {/* ixtiyoriy Page ishlatilgani un switch dan tashqarisida yozildi*/}
      <ChatWidget />
      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose} //send via props
      />
    </>
  );
}

export default App; // export to intex.tsx
