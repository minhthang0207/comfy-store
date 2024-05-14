import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const ComplexPaginationContainer = () => {
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
  }

  if (pageCount < 2) {
    return null
  }

  const addButton = ({ pageNumber, activeButton }) => {
    return (
      <button
        key={pageNumber}
        className={`join-item btn btn-xs sm:btn-md border-none ${
          activeButton ? 'bg-base-300 border-base-300' : ''
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []
    // first button
    pageButtons.push(addButton({ pageNumber: 1, activeButton: page === 1 }))

    // dot button
    if (page > 2) {
      pageButtons.push(
        <button
          key="dot1"
          className={`join-item btn btn-xs sm:btn-md border-none`}
        >
          ...
        </button>
      )
    }

    // active/current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addButton({ pageNumber: page, activeButton: true }))
    }

    // dot button
    if (page < pageCount - 1) {
      pageButtons.push(
        <button
          key="dot2"
          className={`join-item btn btn-xs sm:btn-md border-none`}
        >
          ...
        </button>
      )
    }

    // first last
    pageButtons.push(
      addButton({ pageNumber: pageCount, activeButton: page === pageCount })
    )

    return pageButtons
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
            handlePageChange(newNumber)
          }}
        >
          prev
        </button>

        {renderPageButtons()}

        <button
          className="join-item btn btn-xs sm:btn-md uppercase"
          onClick={() => {
            let newNumber = page + 1
            if (newNumber > pageCount) {
              newNumber = 1
            }
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
export default ComplexPaginationContainer
