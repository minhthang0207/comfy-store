import { useLoaderData } from 'react-router-dom'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { FaBars } from 'react-icons/fa'
import { BsFillGridFill } from 'react-icons/bs'
import { useState } from 'react'

const ProductsContainer = () => {
  const { meta } = useLoaderData()
  const totalProduct = meta.pagination.total
  const [layout, setLayout] = useState('grid')

  const setActiveStyles = (pattern) => {
    return `btn btn-circle text-xl btn-sm ${
      pattern === layout
        ? 'btn-active btn-primary text-primary-content'
        : 'btn-ghost text-base-content'
    }`
  }
  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium">
          {totalProduct} product{totalProduct > 1 && 's'}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            className={setActiveStyles('grid')}
            onClick={() => setLayout('grid')}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            className={setActiveStyles('list')}
            onClick={() => setLayout('list')}
          >
            <FaBars />
          </button>
        </div>
      </div>
      {/* PRODUCT */}
      {totalProduct < 1 ? (
        <h5 className="text-2xl mt-16">
          Sorry, no products matched your search...
        </h5>
      ) : layout === 'grid' ? (
        <ProductsGrid />
      ) : (
        <ProductsList />
      )}
    </>
  )
}
export default ProductsContainer
