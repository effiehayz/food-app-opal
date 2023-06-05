import React, { Fragment, useMemo, useState } from "react";
import "./App.css";
import data from "./data/menu.json";
import MenuEntry, { Cart, MenuItem, MenuOption } from "./components/MenuEntry";

function App() {
  const { menu } = data;

  const [cart, setCart] = useState<Cart>([]);
  const [cartActive, setCartActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const addItemToCart = (
    menuItem: MenuItem,
    userChoice: MenuOption,
    quantity: number
  ) => {
    if (userChoice === undefined) return;
    setCartActive(true);
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

  const handleBuy = () => {
    if (cart.length > 0) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="master-container" role="main">
      <h1 className="page-heading">Menu Items</h1>
      <div className="title-container">
        <h2 className="title" tabIndex={0}>
          Your cart: {cart.length}
        </h2>
      </div>
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
        <h2 className="checkout-title">Checkout</h2>
        {cartActive ? (
          <div className="details" role="group" aria-label="Cart Items">
            {cart.map((cartItem, index) => (
              <Fragment key={cartItem.name + cartItem.size}>
                <span>
                  {cartItem.name} ({cartItem.size})
                </span>
                <span>
                  {(cartItem.quantity * cartItem.price).toFixed(2)}$
                  <button
                    className="remove-btn"
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
        ) : (
          <div className="purchase-details">
            Click the add button to make a purchase
          </div>
        )}
        {showModal && (
          <div className="modal-container">
            <div className="modal">
              <div className="modal-header">
                <h3>Order Complete</h3>
              </div>
              <div className="modal-body">
                <p>Your order has been completed successfully.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={closeModal}>
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="checkout--footer">
          <label className="price" aria-live="polite">
            <sup>$</sup>
            {price}
          </label>
          <button
            className="checkout-btn"
            aria-label="Buy"
            disabled={cart.length === 0}
            onClick={handleBuy}
          >
            Buy <i className="modal-icon fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
