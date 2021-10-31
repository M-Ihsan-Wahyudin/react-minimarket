import { Fragment, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useHistory } from "react-router";

export default function Login() {

  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');

  const loginRequest = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    axios.post('http://127.0.0.1:8000/api/login', formData)
    .then(res => {
      localStorage.setItem("jwt", res.data.token);
      history.push('/dashboard');
      showToast(res.data.message, 'success')
    })
    .catch(err => {
      setErrorMessage(err.response.data.message)
      showToast(errorMessage, 'error')
    })
  }

  const showToast = (message, icon) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white py-7 px-10 rounded-md shadow" id="formLogin">
            <div className="mb-10">
              <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or &nbsp;
                <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  contact owner to get your account
                </a>
              </p>
            </div>
            <form onSubmit={loginRequest} method="post">
              <section className="flex flex-col">
                <span className="w-full text-sm my-2">
                  <label className="block text-gray-600 font-bold mb-1">Email Address</label>
                  <input type="text" name="email" id="email" className="border w-full p-2 rounded-md focus:outline-none focus:ring" autoFocus />
                  <small className="text-red-500"></small>
                </span>
                <span className="w-full text-sm my-2">
                  <label className="block text-gray-600 font-bold mb-1">Password</label>
                  <input name="password" id="password" className="border w-full p-2 rounded-md focus:outline-none focus:ring" type="password" autoComplete="password" autoFocus />
                </span>
                <div className="flex items-center justify-between my-2">
                  <div className="text-sm">
                    <a href="/" className="text-sm font-medium hover:text-indigo-600 hover:text-indigo-500 focus:ring focus:outline-none rounded-md">
                      I dont have account
                    </a>
                  </div>

                  <div className="text-sm">
                    <a href="/" className="text-sm font-medium hover:text-indigo-600 hover:text-indigo-500 focus:ring focus:outline-none rounded-md">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 rounded-md py-2 px-4 text-white focus:ring focus:outline-none rounded-md mt-5" autoFocus>
                  Sign In
                </button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}