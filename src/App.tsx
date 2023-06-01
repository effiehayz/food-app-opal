import React, { Fragment, useMemo, useState } from "react";
import "./App.css";
import data from "./data/menu.json";
import MenuEntry, { Cart, MenuItem, MenuOption } from "./components/MenuEntry";

function App() {
  const { menu } = data;

  const [cart, setCart] = useState<Cart>([]);

  const addItemToCart = (
    menuItem: MenuItem,
    userChoice: MenuOption,
    quantity: number
  ) => {
    if (userChoice === undefined) return;
    setCart((cart) => {
      const copy = [...cart];
      const oldCopy = copy.find(
        (item) => item.name === menuItem.item && userChoice?.size === item.size
      );
      if (oldCopy !== undefined) {
        oldCopy.quantity = quantity;
      } else {
        copy.push({
          name: menuItem.item,
          size: userChoice?.size,
          quantity: quantity,
          price: userChoice?.price,
        });
      }
      return copy;
    });
  };

  const removeItemFromCart = (index: number) => {
    setCart((cart) => {
      const cartCopy = [...cart];
      cartCopy.splice(index, 1);
      return cartCopy;
    });
  };

  const price = useMemo(() => {
    let price = 0;
    cart.forEach((cartItem) => (price += cartItem.price * cartItem.quantity));
    return price.toFixed(2);
  }, [cart]);

  return (
    <div className="master-container" role="main">
      <h2 className="title">Your cart: {cart.length}</h2>
      {menu.map((item) => (
        <div key={item.item} className="card cart">
          <div className="products">
            <MenuEntry
              menuItem={item}
              addItemToCart={addItemToCart}
              cart={cart}
            />
          </div>
        </div>
      ))}

      <div className="card checkout">
        <h2 className="title">Checkout</h2>
        <div className="details" role="group" aria-label="Cart Items">
          {cart.map((cartItem, index) => (
            <Fragment key={cartItem.name + cartItem.size}>
              <span>
                {cartItem.name} ({cartItem.size})
              </span>
              <span>
                {(cartItem.quantity * cartItem.price).toFixed(2)}${" "}
                <button
                  onClick={() => removeItemFromCart(index)}
                  title="Remove item from cart"
                  aria-label="Remove item"
                >
                  X
                </button>
              </span>
            </Fragment>
          ))}
        </div>
        <div className="checkout--footer">
          <label className="price" aria-live="polite">
            <sup>$</sup>
            {price}
          </label>
          <button className="checkout-btn" aria-label="Buy">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
