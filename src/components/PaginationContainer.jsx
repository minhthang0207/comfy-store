import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const { meta } = useLoaderData()
  const { page, pageCount } = meta.pagination

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1
  })

  // useLocation
  const { pathname, search } = useLocation()

  // useNavigate
  const navigate = useNavigate()

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)

    console.log(pageNumber)
  }

  if (pageCount < 2) {
    return null
  }

  return (
    <div className="mt-16 flex justify-end ">
      <div className="join">
        <button
          className="join-item btn btn-xs sm:btn-md uppercase"
          onClick={() => {
            let newNumber = page - 1
            if (newNumber < 1) {
              newNumber = pageCount
            }
            console.log(newNumber)
            handlePageChange(newNumber)
          }}
        >
          prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`join-item btn btn-xs sm:btn-md border-none ${
                pageNumber === page ? 'bg-base-300 border-base-300' : ''
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
        <button
          className="join-item btn btn-xs sm:btn-md uppercase"
          onClick={() => {
            let newNumber = page + 1
            if (newNumber > pageCount) {
              newNumber = 1
            }
            console.log(newNumber)

            handlePageChange(newNumber)
          }}
        >
          next
        </button>
      </div>
    </div>
  )
}
{
  /* <button className="join-item btn btn-active">2</button> */
}
export default PaginationContainer
