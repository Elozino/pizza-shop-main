import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import css from "../styles/Menu.module.css"
import { urlFor } from '../utils/client'

export default function Menu({ pizzas }) {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <span>OUR MENU</span>
        <span>Menu That Always</span>
        <span>Makes you hungry</span>
      </div>


      {/**pizzas */}
      <div className={css.menu}>
        {pizzas?.map((pizza, id) => (
          <div className={css.pizza} key={id}>
            <Link href={`pizza/${pizza.slug?.current}`}>

              <div className={css.ImageWrapper}>
                <Image
                  src={urlFor(pizza.image).url()}
                  alt={pizza.name}
                  layout="fill"
                />
              </div>
            </Link>
            <span>{pizza.name}</span>
            <span>
              <span style={{ color: "var(--themeRed" }}>$</span>
              {pizza.price[1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}