import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { logoutUser } from '../features/user/userSlice'
import { useQueryClient } from '@tanstack/react-query'
const Header = () => {
  const queryClient = useQueryClient()
  const user = useSelector((state) => state.userState.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    navigate('/')
    dispatch(clearCart())
    dispatch(logoutUser())
    queryClient.removeQueries()
  }

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end sm:px-8">
        {/* USER */}
        {/* LINKS */}
        {user ? (
          <div className="flex gap-x-2 items-center sm:gap-x-6">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-primary btn-outline btn-xs"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div className="text-sm flex justify-center items-center gap-x-6 ">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header
