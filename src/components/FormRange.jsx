import { useState } from 'react'
import { formatPrice } from '../utils'

const FormRange = ({ label, name, size, price }) => {
  const maxPrice = 100000
  const step = 10000
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice)

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        min={0}
        max={maxPrice}
        step={step}
        value={selectedPrice}
        name={name}
        id={name}
        className={`range range-primary ${size}`}
        onChange={(e) => setSelectedPrice(e.target.value)}
      />
      <div className="w-full mt-2 flex justify-between px-2 text-xs font-bold">
        <span>0</span>
        <span>Max: {formatPrice(maxPrice)}</span>
      </div>
    </div>
  )
}
export default FormRange
