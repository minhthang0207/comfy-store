import { CartTotals, CheckoutForm, SectionTitle } from '../components'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'

export const loader = (store) => () => {
  const user = store.getState().userState.user
  if (!user) {
    toast.warn('Please login first')
    return redirect('/login')
  }
  return null
}

const Checkout = () => {
  const data = useSelector((state) => state.cartState)
  const { cartItems } = data

  if (cartItems.length === 0) {
    return <SectionTitle text="your cart is empty" />
  }
  return (
    <>
      <SectionTitle text="place your order" />
      <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  )
}
export default Checkout
