import { Form, Link, useLoaderData } from 'react-router-dom'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormRange from './FormRange'
import FormCheckbox from './FormCheckbox'
const Filters = () => {
  const { meta, params } = useLoaderData()
  return (
    <Form
      className="bg-base-200 rounded-md px-8 py-4 grid sm:grid-cols-2
     md:grid-cols-3 lg:grid-cols-3 gap-y-8 gap-x-4 items-center"
    >
      {/* SEARCH */}
      <FormInput
        label="search product"
        name="search"
        type="search"
        size="input-sm"
        defaultValue={params.search}
      />
      {/* CATEGORY */}
      <FormSelect
        label="select category"
        name="category"
        list={meta.categories}
        size="select-sm"
        defaultValue={params.category}
      />
      {/* COMPANY */}
      <FormSelect
        label="select company"
        name="company"
        list={meta.companies}
        size="select-sm"
        defaultValue={params.company}
      />
      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={['a-z', 'z-a', 'high', 'low']}
        size="select-sm"
        defaultValue={params.order}
      />
      {/* PRICE */}
      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        price={params.price}
      />
      {/* SHIPPING */}
      <FormCheckbox
        label="free shipping"
        name="shipping"
        size="checkbox-sm"
        defaultValue={params.shipping}
      />
      {/* BUTTON */}
      <button
        type="submit"
        className="btn btn-primary btn-sm uppercase text-primary-content"
      >
        search
      </button>
      <Link
        to="/products"
        className="btn btn-accent btn-sm uppercase text-primary-content"
      >
        reset
      </Link>
    </Form>
  )
}
export default Filters
