import Image from "next/image";
import React, { useState } from "react";
import css from "../../styles/Pizza.module.css";
import Layout from "../../components/Layout";
import { client, urlFor } from "../../utils/client";
import LeftArrow from "../../assets/arrowLeft.png";
import rightArrow from "../../assets/arrowRight.png";
import { useStore } from "../../zustand/store";
import toast, { Toaster } from "react-hot-toast";

export default function Pizza({ pizza }) {
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    type === "incr"
      ? setQuantity((prev) => prev + 1)
      : quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
    ("");
    // type === "incr" ? setQuantity((prev) => prev + 1) : "";
  };

  // add to cart function
  const addPizza = useStore((state) => state.addPizza);
  const addToCart = () => {
    addPizza({
      ...pizza,
      price: pizza.price[size],
      quantity: quantity,
      size: size,
    });
    toast.success("Added to Cart");
  };
  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image
            src={urlFor(pizza.image).width(200).url()}
            alt={pizza.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* right side */}
        <div className={css.right}>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>
          <span>
            <span style={{ color: "var(--themeRed)" }}>$</span>{" "}
            {Number(pizza.price[`${size}`])}
          </span>
          <div className={css.size}>
            <span>Size</span>
            <div className={css.sizeVariant}>
              <div
                onClick={() => setSize(0)}
                className={size === 0 ? css.selected : ""}
              >
                Small
              </div>
              <div
                onClick={() => setSize(1)}
                className={size === 1 ? css.selected : ""}
              >
                Medium
              </div>
              <div
                onClick={() => setSize(2)}
                className={size === 2 ? css.selected : ""}
              >
                Large
              </div>
            </div>
          </div>

          {/* Quantity counter */}
          <div className={css.quantity}>
            <span>Quantity</span>
            <div className={css.counter}>
              <Image
                src={LeftArrow}
                alt={"arrow-left"}
                height={20}
                width={20}
                objectFit="contain"
                onClick={() => handleQuantity("decr")}
              />
              <span>{quantity}</span>
              <Image
                src={rightArrow}
                alt={"arrow-right"}
                height={20}
                width={20}
                objectFit="contain"
                onClick={() => handleQuantity("incr")}
              />
            </div>
          </div>
          {/* button */}
          <div className={`btn ${css.btn}`} onClick={addToCart}>
            Add to cart
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const query = `*[_type == "pizza" && defined(slug.current)][].slug.current`;
  const paths = await client.fetch(query);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  //Search for the slug value and if not found, we set it to an empty string
  const { slug = "" } = context.params;
  const pizza = await client.fetch(
    `*[_type == "pizza" && slug.current == ${slug}][0]`
  );

  return {
    props: { pizza },
  };
}
