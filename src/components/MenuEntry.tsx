import React, { ChangeEvent, useMemo, useState } from "react";

export type MenuOption = {
  size: string;
  price: number;
};

export type MenuItem = {
  item: string;
  options: MenuOption[];
};

export type MenuEntryProps = {
  menuItem: MenuItem;
  addItemToCart: (item: MenuItem, option: MenuOption, qnt: number) => void;
  cart: Cart;
};

export type CartItem = {
  name: string;
  size: string;
  quantity: number;
  price: number;
};

export type Cart = CartItem[];

const MenuEntry = ({ menuItem, addItemToCart, cart }: MenuEntryProps) => {
  const [userChoice, setUserChoice] = useState<MenuOption>();
  const [quantity, setQuantity] = useState<number>(1);

  const cartCache = useMemo<Record<string, CartItem>>(() => {
    const cache = {};
    cart.forEach((item) => {
      // @ts-ignore
      cache[`${item.name}_${item.size}`] = item;
    });
    return cache;
  }, [cart]);

  const addToCart = () => {
    if (userChoice) {
      addItemToCart(menuItem, userChoice, quantity);
      setQuantity(1);
      setUserChoice(undefined);
    }
  };

  const onChoose = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selection = menuItem.options.find((option) => value === option.size);
    setUserChoice(selection);
    const quantity =
      cartCache[`${menuItem.item}_${selection?.size}`]?.quantity || 1;
    setQuantity(quantity);
  };

  const increase = () => setQuantity((quantity) => quantity + 1);
  const decrease = () => setQuantity((quantity) => Math.max(1, quantity - 1));

  return (
    <div className="product" data-testid="product">
      <svg
        fill="none"
        viewBox="0 0 60 60"
        height="60"
        width="60"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <svg
          fill="none"
          viewBox="0 0 60 60"
          height="60"
          width="60"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect fill="#FFF6EE" rx="8.25" height="60" width="60"></rect>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.25"
            stroke="#FF8413"
            fill="#FFB672"
            d="M34.2812 18H25.7189C21.9755 18 18.7931 20.5252 17.6294 24.0434C17.2463 25.2017 17.0547 25.7808 17.536 26.3904C18.0172 27 18.8007 27 20.3675 27H39.6325C41.1993 27 41.9827 27 42.4639 26.3904C42.9453 25.7808 42.7538 25.2017 42.3707 24.0434C41.207 20.5252 38.0246 18 34.2812 18Z"
          ></path>
          <path
            fill="#FFB672"
            d="M18 36H17.25C16.0074 36 15 34.9926 15 33.75C15 32.5074 16.0074 31.5 17.25 31.5H29.0916C29.6839 31.5 30.263 31.6754 30.7557 32.0039L33.668 33.9453C34.1718 34.2812 34.8282 34.2812 35.332 33.9453L38.2443 32.0039C38.7371 31.6754 39.3161 31.5 39.9084 31.5H42.75C43.9926 31.5 45 32.5074 45 33.75C45 34.9926 43.9926 36 42.75 36H42M18 36L18.6479 38.5914C19.1487 40.5947 20.9486 42 23.0135 42H36.9865C39.0514 42 40.8513 40.5947 41.3521 38.5914L42 36M18 36H28.5ZM42 36H39.75Z"
          ></path>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.25"
            stroke="#FF8413"
            d="M18 36H17.25C16.0074 36 15 34.9926 15 33.75C15 32.5074 16.0074 31.5 17.25 31.5H29.0916C29.6839 31.5 30.263 31.6754 30.7557 32.0039L33.668 33.9453C34.1718 34.2812 34.8282 34.2812 35.332 33.9453L38.2443 32.0039C38.7371 31.6754 39.3161 31.5 39.9084 31.5H42.75C43.9926 31.5 45 32.5074 45 33.75C45 34.9926 43.9926 36 42.75 36H42M18 36L18.6479 38.5914C19.1487 40.5947 20.9486 42 23.0135 42H36.9865C39.0514 42 40.8513 40.5947 41.3521 38.5914L42 36M18 36H28.5M42 36H39.75"
          ></path>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="3"
            stroke="#FF8413"
            d="M34.512 22.5H34.4982"
          ></path>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.25"
            stroke="#FF8413"
            d="M27.75 21.75L26.25 23.25"
          ></path>
        </svg>

        <svg
          fill="none"
          viewBox="0 0 24 24"
          height="14"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            stroke="#47484b"
            d="M12 4V20M20 12H4"
          ></path>
        </svg>
      </svg>
      <div>
        <label className="product-name" htmlFor={`select-${menuItem.item}`}>
          {menuItem.item}
          <select
            data-testid="select"
            defaultValue={userChoice?.size}
            onChange={onChoose}
            aria-label="Select an option"
            id={`select-${menuItem.item}`}
          >
            <option data-testid="select-option" hidden>
              Select an option
            </option>
            {menuItem.options.map((option) => (
              <option
                data-testid="select-option"
                key={option.size}
                value={option.size}
              >
                {option.size}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="quantity">
        <button
          data-testid="increase"
          onClick={decrease}
          aria-label="Decrease quantity"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="14"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              stroke="#47484b"
              d="M20 12L4 12"
            ></path>
          </svg>
        </button>
        <label
          htmlFor={`quantity-${menuItem.item}`}
          id={`quantity-${menuItem.item}`}
        >
          {quantity}
        </label>
        <button
          data-testid="decrease"
          onClick={increase}
          aria-label="Increase quantity"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="14"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              stroke="#47484b"
              d="M12 4V20M20 12H4"
            ></path>
          </svg>{" "}
        </button>
      </div>
      <label
        className="price small"
        htmlFor={`price-${menuItem.item}`}
        id={`price-${menuItem.item}`}
      >
        ${userChoice?.price.toFixed(2)}
      </label>
      <button
        className="buy-btn"
        data-testid="addbtn"
        onClick={addToCart}
        aria-label="Add To Cart"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          height="14"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            stroke="#47484b"
            d="M12 4V20M20 12H4"
          ></path>
        </svg>
        Add
      </button>
    </div>
  );
};

export default MenuEntry;
