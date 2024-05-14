import { Link, useLoaderData } from 'react-router-dom'
import { customFetch, formatPrice, generateAmountOptions } from '../utils/index'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'

const SingleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => {
      return customFetch(`/products/${id}`)
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const resp = await queryClient.ensureQueryData(
      SingleProductQuery(params.id)
    )
    return { product: resp.data.data }
  }

const SingleProduct = () => {
  const { product } = useLoaderData()
  const { company, colors, description, image, price, title } =
    product.attributes
  const [productColor, setProductColor] = useState(colors[0])
  const dollarsAmount = formatPrice(price)

  const [amount, setAmount] = useState(1)
  const handleAmount = (e) => {
    const result = parseInt(e.target.value)
    setAmount(result)
  }

  const cartProduct = {
    cartID: product.id + productColor,
    productId: product.id,
    company,
    image,
    price,
    title,
    amount,
    productColor,
  }

  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }))
  }

  return (
    <section>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 rounded-lg object-cover lg:w-full"
        />
        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          <h4 className="mt-2 font-bold text-lg text-neutral-content">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-6">
            {/* COLORS */}
            <h4 className="text-base font-medium capitalize">colors</h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge badge-lg mr-2 ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                )
              })}
            </div>
            {/* AMOUNT */}
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="amount">
                <h4 className="font-medium capitalize">amount</h4>
              </label>
              <select
                className="select select-bordered select-secondary select-md"
                id="amount"
                name="amount"
                onChange={handleAmount}
              >
                {generateAmountOptions(20)}
              </select>
            </div>
            {/* BUTTON */}
            <div className="mt-10">
              <button
                className="btn btn-md btn-secondary uppercase"
                onClick={addToCart}
              >
                add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SingleProduct
