import create from "zustand";

export const useStore = create((set) => ({
  //cart
  cart: {
    pizza: [],
  },

  // add pizza to cart
  addPizza: (data) => {
    set((state) => ({
      cart: {
        pizza: [...state.cart.pizza, data],
      },
    }));
  },

  // remove pizza from cart
  removePizza: (index) => {
    set((state) => ({
      cart: {
        pizza: state.cart.pizza.filter((_, i) => i != index),
      },
    }));
  },

  resetCart: () => {
    set(() => ({
      cart: {
        pizza: [],
      },
    }));
  },
}));
