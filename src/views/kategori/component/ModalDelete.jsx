import axios from "axios";
import { forwardRef ,useImperativeHandle, useState } from "react";
import { ExclamationIcon } from "@heroicons/react/solid";
import { Dialog } from "@headlessui/react";
// Component
import Modal from "../../../component/modal/modal"

const ModalDelete = forwardRef((props, ref) => {

  const [open, setOpen] = useState(false)
  const [dataId, setDataId] = useState();

  const deleteData = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    axios({
      method: 'DELETE',
      baseURL: `http://127.0.0.1:8000/api/category/${dataId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      props.onSuccess(res.data.message, 'success');
      setOpen(false);
    })
    .catch(err => {
      console.info(err.response.data)
      props.onError(err.response.data.message, 'error');
    })
  }

  useImperativeHandle(ref, () => ({
    setOpenModal(boolean, id) {
      setOpen(boolean)
      setDataId(id);
    }
  }))

  return (
    <Modal isOpen={open} onCloseModal={() => setOpen(false)}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
              Delete Data
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this data? All of your data will be permanently removed.
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={deleteData}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
})

export default ModalDelete;