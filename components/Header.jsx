import React, { useState, useEffect } from 'react'
import css from "../styles/Header.module.css"
import Image from "next/image"
import Logo from "../assets/Logo.png"
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons"
import { useStore } from '../zustand/store'
import Link from 'next/link'

const Header = () => {
  // // To check if you state is working
  // const state = useStore(state => state)
  // console.log(state)
  const items = useStore((state) => state.cart.pizza.length)

  const [ongoingOrder, setOngoingOrder] = useState("")

  useEffect(() => {
    setOngoingOrder(localStorage.getItem("order"))
  }, [])

  return (
    <div className={css.header}>
      {/* logo side */}
      <Link href="/">
        <div className={css.logo}>
          <Image src={Logo} alt="" width={50} height={50} />
          <span>Fudo</span>
        </div>
      </Link>

      {/* menu side */}
      <ul className={css.menu}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>

      {/* right side */}
      <div className={css.rightSide}>
        <Link href="/cart">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="#2e2e2e" />
            <div className={css.badge}>{items}</div>
          </div>
        </Link>
        {ongoingOrder && (
          <Link href={`/order/${ongoingOrder}`}>
            <div className={css.cart}>
              <UilReceipt size={35} color="#2e2e2e" />
              {ongoingOrder != "" && (
                <div className={css.badge}>1</div>
              )}
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header