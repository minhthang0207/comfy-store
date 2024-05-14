import { Form, redirect } from 'react-router-dom'
import FormInput from './FormInput'
import SubmitBtn from './SubmitBtn'
import { clearCart } from '../features/cart/cartSlice'
import { customFetch, formatPrice } from '../utils'
import { toast } from 'react-toastify'
export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const { name, address } = Object.fromEntries(formData)
    const user = store.getState().userState.user
    const { cartItems, numItemsInCart, orderTotal } = store.getState().cartState
    const info = {
      address,
      name,
      cartItems,
      chargeTotal: orderTotal,
      numItemsInCart,
      orderTotal: formatPrice(orderTotal),
    }
    try {
      const resp = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      // queryClient.removeQueries(['orders'])
      queryClient.removeQueries({ queryKey: ['orders'] })
      store.dispatch(clearCart())
      toast.success('order placed successfully')
      return redirect('/orders')
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'Please double check your credentials'
      console.log(error)
      toast.error(errorMessage)
      if (error.response.status === 401 || 403) {
        return redirect('/login')
      }
    }

    return null
  }

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-4">
      <h3 className="font-medium capitalize text-xl">shipping information</h3>
      <FormInput label="first name" name="name" type="text" size="input-md" />
      <FormInput label="address" name="address" type="text" size="input-md" />
      <SubmitBtn text="place your orders" />
    </Form>
  )
}
export default CheckoutForm
