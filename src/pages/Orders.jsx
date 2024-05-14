import { toast } from 'react-toastify'
import { redirect, useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils'
import {
  ComplexPaginationContainer,
  OrdersList,
  PaginationContainer,
  SectionTitle,
} from '../components'

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  }
}

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user
    if (!user) {
      toast.warn('Login to see view store')
      return redirect('/login')
    }
    const url = new URL(request.url)
    const params = Object.fromEntries([...url.searchParams.entries()])
    try {
      const resp = await queryClient.ensureQueryData(ordersQuery(params, user))
      // console.log(resp.data.data)
      return { orders: resp.data.data, meta: resp.data.meta }
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

const Orders = () => {
  const { meta } = useLoaderData()
  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make an order" />
  }
  console.log(meta)
  return (
    <>
      <SectionTitle text="your orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  )
}
export default Orders
