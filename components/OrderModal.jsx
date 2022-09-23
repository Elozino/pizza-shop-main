import { Modal, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import css from "../styles/OrderModal.module.css"
import { createOrder } from '../utils/orderHandler'
import { useStore } from '../zustand/store'

export default function OrderModal({ opened, setOpened, paymentMethod }) {
  const theme = useMantineTheme()
  const [formData, setFormData] = useState(null)
  const resetCart = useStore(state => state.resetCart)

  const router = useRouter()

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const total = typeof window !== "undefined" && localStorage.getItem("total")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = await createOrder({ ...formData, total, paymentMethod })
    console.log("Order Placed", id)
    toast.success("Order Placed")
    resetCart()
    { typeof window !== "undefined" && localStorage.setItem("order", id) }
    router.push(`/order/${id}`)
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* modal content */}
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input
          onChange={handleInput}
          type="text" placeholder='Name' name="name" required />
        <input
          onChange={handleInput}
          type="telephone" name='phone' placeholder='Phone Number' required />
        <textarea
          onChange={handleInput}
          name='address' rows={3} placeholder="Address">

        </textarea>
        <span>You will pay an amount
          <span> ${total}</span> on delivery
        </span>

        <button type='submit' className='btn'>
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  )
}
