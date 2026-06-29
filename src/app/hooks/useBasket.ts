//Customized hook

import { useEffect, useState } from "react";
import { CartItem } from "../../lib/types/search";
import { useGlobals } from "./useGlobal";

const useBasket = () => {
  const { authMember } = useGlobals();
  // Har bir userning savati alohida kalitda saqlanadi, login bulmaganlar un "guest"
  const storageKey = authMember?._id
    ? `cartData_${authMember._id}`
    : "cartData_guest";

  const cartJson: string | null = localStorage.getItem(storageKey);
  const currentCart = cartJson ? JSON.parse(cartJson) : [];

  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart); //initialState currentCart bulishi kk

  // Login/logout bulganda (authMember uzgarganda) savatni shu userning kalitidan qaytadan yuklaymiz.
  // Bu logout'da savatni bushatadi, qayta login'da esa usha userning savatini tiklaydi.
  useEffect(() => {
    const json: string | null = localStorage.getItem(storageKey);
    setCartItems(json ? JSON.parse(json) : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authMember?._id]);

  /**HANDLERS */

  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item,
      );
      setCartItems(cartUpdate);
      localStorage.setItem(storageKey, JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem(storageKey, JSON.stringify(cartUpdate)); // bu yerda cartUpdateni 'cartData' nomi bn string formatda localStorage ga saqlayapmiz.
    }
  };

  const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist.quantity === 1) {
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id,
      ); //bunda shu input._id  ga teng bulmagan item._id larni qoldir degani
      setCartItems(cartUpdate);
      localStorage.setItem(storageKey, JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item,
      ); //bunda faqat shu product id idagi quantityni 1ga kamaytirib, qolganlarini uz holicha qaytar degani
      setCartItems(cartUpdate);
      localStorage.setItem(storageKey, JSON.stringify(cartUpdate));
    }
  };

  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id,
    );
    setCartItems(cartUpdate);
    localStorage.setItem(storageKey, JSON.stringify(cartUpdate));
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem(storageKey);
  };

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
