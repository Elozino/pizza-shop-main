import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import OrderModal from "../components/OrderModal";
import css from "../styles/Cart.module.css";
import { urlFor } from "../utils/client";
import { useStore } from "../zustand/store";

export default function Cart() {
  const cartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [ongoingOrder, setOngoingOrder] = useState(
    typeof window !== "undefined" && localStorage.getItem("order")
  );
  const router = useRouter();

  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item Removed");
  };

  const total = () =>
    cartData.pizza.reduce((a, b) => a + b.quantity * b.price, 0);

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== "undefined" && localStorage.setItem("total", total());
  };

  const handleCheckout = async () => {
    setPaymentMethod(1);
    typeof window !== "undefined" && localStorage.setItem("total", total());
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData.pizza),
    });

    if (response.status === 500) return;
    const data = await response.json();
    toast.loading("Redirecting");
    router.push(data.url);
  };
  return (
    <Layout>
      <div className={css.container}>
        {/* details */}
        <div className={css.details}>
          <table className={css.table}>
            <thead className={css.thead}>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody className={css.tbody}>
              {cartData.pizza.length > 0 &&
                cartData.pizza.map((pizza, index) => (
                  <tr key={index}>
                    <td className={css.imageTd}>
                      <Image
                        src={urlFor(pizza.image).url()}
                        alt={pizza.name}
                        objectFit="cover"
                        width={100}
                        height={85}
                      />
                    </td>
                    <td>{pizza.name}</td>
                    <td>
                      {pizza.size === 0
                        ? "Small"
                        : pizza.size === 1
                        ? "Medium"
                        : "Large"}
                    </td>
                    <td>{pizza.price}</td>
                    <td>{pizza.quantity}</td>
                    <td>{pizza.price * pizza.quantity}</td>
                    <td
                      style={{ color: "var(--themeRed)", cursor: "pointer" }}
                      onClick={() => handleRemove(index)}
                    >
                      x
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* summary */}
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.cartDetails}>
            <div>
              <span>Items</span>
              <span>{cartData.pizza.length}</span>
            </div>
            <div>
              <span>Total: </span>
              <span>${total()}</span>
            </div>
          </div>

          {!ongoingOrder && cartData.pizza.length > 0 ? (
            <div className={css.buttons}>
              <button className="btn" onClick={handleOnDelivery}>
                Pay on Delivery
              </button>
              <button className="btn" onClick={handleCheckout}>
                Pay Now
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Toaster />

      {/* modal */}
      <OrderModal
        opened={paymentMethod == 0}
        setOpened={setPaymentMethod}
        paymentMethod={paymentMethod}
      />
    </Layout>
  );
}
