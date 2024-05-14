import { Link, useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils'

const ProductsGrid = () => {
  const { products } = useLoaderData()
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {products.map((product) => {
        const { title, image, price } = product.attributes
        const dollarsAmount = formatPrice(price)
        return (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="card w-full shadow-xl hover:shadow-2xl transition duration-300">
              <figure className="px-6 pt-6">
                <img
                  src={image}
                  alt={title}
                  className="rounded-xl h-64 w-full object-cover md:h-48 lg:h"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title capitalize tracking-wider">
                  {title}
                </h2>
                <span className="text-secondary">{dollarsAmount}</span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
export default ProductsGrid
