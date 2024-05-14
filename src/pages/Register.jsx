import { Form, Link, redirect } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const resp = await customFetch.post('/auth/local/register', data)
    toast.success('accout created successfully')
    return redirect('/login')
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      'Please double check your credentials'
    toast.error(errorMessage)
    return null
  }
}

const Register = () => {
  return (
    <section className="grid min-h-screen place-items-center">
      <Form
        className="card w-96 bg-base-100 shadow-xl p-6 flex flex-col gap-y-4"
        method="POST"
      >
        <h4 className="text-3xl font-bold text-center">Register</h4>
        <FormInput
          label="username"
          name="username"
          type="text"
          defaultValue=""
        />
        <FormInput
          label="email"
          name="email"
          type="email"
          defaultValue="test@test.com"
        />
        <FormInput
          label="password"
          name="password"
          type="password"
          defaultValue="12322131"
        />
        <div className="mt-6">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center ">
          Already a member?
          <Link to="/login" className="ml-2 link link-hover link-primary">
            Login
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Register
