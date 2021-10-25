import { Fragment } from "react"
import { useHistory } from "react-router-dom"

export default function PageNotFound() {
  const history = useHistory();
  return (
    <Fragment>
      <div className="bg-gray-50 w-screen h-screen overflow-hidden flex justify-center items-center">
        <div className="sm:w-9/12 md:w-8/12 lg:w-7/12 grid grid-cols-6">
          <div className="col-span-6 md:col-span-2 px-10 py-5 text-center md:text-right">
            <span className="block font-extrabold text-6xl text-blue-600">404</span>
          </div>
          <div className="col-span-6 md:col-span-4 px-10 py-5 text-center md:text-left">
            <span className="block text-4xl font-extrabold">Page Not Found</span>
            <span className="block text-xl px-1 text-gray-500">Please Check the URL in the address bar and try again</span>
            <div className="block my-5">
              <button onClick={() => history.goBack()} className="bg-blue-600 text-white px-4 py-2 rounded-md text-xl focus:outline-none focus:ring hover:bg-blue-400">
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
