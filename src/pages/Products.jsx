import { Filters, ProductsContainer, PaginationContainer } from '../components'
import { customFetch } from '../utils'

const url = '/products'

const allProductQuery = (params) => {
  const { search, category, company, order, price, page } = params
  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      order ?? 'a-z',
      price ?? 100000,
      page ?? 1,
    ],
    queryFn: () => customFetch('/products', { params }),
  }
}

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    const response = await queryClient.ensureQueryData(allProductQuery(params))
    const products = response.data.data
    const meta = response.data.meta
    return { products, meta, params }
  }

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}
export default Products
