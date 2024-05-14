import { Link, useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils'

const ProductsList = () => {
  const { products } = useLoaderData()
  return (
    <div className="mt-12 grid gap-y-10">
      {products.map((product) => {
        const { title, image, price, company } = product.attributes
        const dollarsAmount = formatPrice(price)
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="flex flex-col gap-y-6 sm:flex-row p-8 shadow-lg rounded-lg hover:shadow-2xl 
            transition duration-300 group"
          >
            <img
              src={image}
              alt={title}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">{title}</h3>
              <h4 className="capitalize text-md text-neutral-content">
                {company}
              </h4>
            </div>
            <p className="text-lg font-medium ml-0 sm:ml-auto">
              {dollarsAmount}
            </p>
          </Link>
        )
      })}
    </div>
  )
}
export default ProductsList
