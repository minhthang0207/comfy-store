import { formatPrice, generateAmountOptions } from '../utils'
import { useDispatch } from 'react-redux'
import { removeItem, editItem } from '../features/cart/cartSlice'

const CartItem = ({
  cartID,
  amount,
  company,
  title,
  image,
  price,
  productColor,
}) => {
  const dispatch = useDispatch()
  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }))
  }

  const handleChange = (e) => {
    dispatch(editItem({ cartID, amount: e.target.value }))
  }

  return (
    <article className="flex gap-4 flex-col mb-12 sm:flex-row last:border-b-0 border-b border-base-300 pb-6">
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="w-24 h-24 sm:h-32 sm:w-32 rounded-lg object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{title}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 text-sm text-neutral-content">{company}</h4>
        {/* COLOR */}
        <p className="text-sm mt-4 flex items-center">
          Color:
          <span
            className="ml-2 badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      {/* AMOUNT */}
      <div className="sm:ml-12 max-w-xs">
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="amount">
            <span className="label-text capitalize">amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="select select-bordered select-xs"
            value={amount}
            onChange={handleChange}
          >
            {generateAmountOptions(amount + 5)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className="link link-hover link-primary mt-2 text-sm"
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  )
}
export default CartItem
