import axios from "axios"
import { forwardRef ,useImperativeHandle, useState } from "react"
// Component
import Modal from "../../../component/modal/modal"

const ModalCreate = forwardRef((props, ref) => {

  const [open, setOpen] = useState(false)
  const [errorForm, setErrorForm] = useState({})

  const storeData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = localStorage.getItem('jwt');

    axios({
      method: 'POST',
      baseURL: 'https://backend-minimarket.herokuapp.com/api/user',
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      props.onSuccess(res.data.message, 'success');
      setErrorForm({});
      setOpen(false);
    })
    .catch(err => {
      console.info(err.response.data)
      setErrorForm(err.response.data.errors)
      props.onError(err.response.data.message, 'error');
    })
  }

  useImperativeHandle(ref, () => ({
    setOpenModal(boolean) {
      setOpen(boolean)
    }
  }))

  return (
    <Modal isOpen={open} onCloseModal={() => setOpen(false) || setErrorForm({})}>
      <form onSubmit={storeData}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="mb-2">
            <h2 className="text-2xl text-indigo-500 font-bold">Karyawan Baru</h2>
          </div>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm text-gray-700 font-bold">Nama Karyawan</label>
            <input type="text" name="name" id="name" className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.name ? 'border-red-500' : 'border-indigo-500'}`} />
            <span className="text-sm text-red-500">{errorForm.name}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm text-gray-700 font-bold">Email</label>
            <input type="email" name="email" id="email" className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.email ? 'border-red-500' : 'border-indigo-500'}`} />
            <span className="text-sm text-red-500">{errorForm.email}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="level" className="block text-sm text-gray-700 font-bold">Kategori</label>
            <select name="level" id="level" className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.level ? 'border-red-500' : 'border-indigo-500'}`}>
              <option value="Operator">Operator</option>
              <option value="Entry Data Processing">Entry Data Processing</option>
            </select>
            <span className="text-sm text-red-500">{errorForm.level}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm text-gray-700 font-bold">Password</label>
            <input type="password" name="password" id="password" className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.password ? 'border-red-500' : 'border-indigo-500'}`} />
            <span className="text-sm text-red-500">{errorForm.password}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="password_confirmation" className="block text-sm text-gray-700 font-bold">Password_confirmation</label>
            <input type="password" name="password_confirmation" id="password_confirmation" className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.password_confirmation ? 'border-red-500' : 'border-indigo-500'}`} />
            <span className="text-sm text-red-500">{errorForm.password_confirmation}</span>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Submit
          </button>
          <button
            type="reset"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setOpen(false) || setErrorForm({})}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
})

export default ModalCreate