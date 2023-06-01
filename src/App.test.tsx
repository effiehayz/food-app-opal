import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import MenuEntry from "./components/MenuEntry";
import data from './data/menu.json';
import {wait} from "@testing-library/user-event/dist/utils";

describe("should implement food store properly", () => {

  test('renders Your cart text', () => {
    render(<App />);
    const linkElement = screen.getByText(/your cart/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('render three items on the interface', () => {
    render(<App />);
    const products = screen.getAllByTestId('product');
    expect(products).toHaveLength(3);
  });

  test('Should change selected option', () => {
    render(<MenuEntry menuItem={data.menu[0]} cart={[]} addItemToCart={jest.fn()} />);
    const dropdown = screen.getByTestId('select');
    const valueToSelect = data.menu[0].options[0].size;
    fireEvent.change(dropdown, {target:{value: valueToSelect}})
    const options = screen.getAllByTestId('select-option');
    // @ts-ignore
    expect(options[1].selected).toBeTruthy();

  });
  test('should add item to cart', async () => {
    const addToCart = jest.fn();
    render(<MenuEntry menuItem={data.menu[0]} cart={[]} addItemToCart={addToCart} />);
    const dropdown = screen.getByTestId('select');
    const valueToSelect = data.menu[0].options[0].size;
    fireEvent.change(dropdown, {target:{value: valueToSelect}})
    const increase = screen.getByTestId('increase');
    fireEvent.click(increase)
    fireEvent.click(increase)
    const addBtn = screen.getByTestId('addbtn');
    fireEvent.click(addBtn);
    await wait(2000)
    expect(addToCart).toHaveBeenCalledTimes(1);
  });
})
