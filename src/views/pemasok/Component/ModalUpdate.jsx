import axios from "axios";
import { forwardRef ,useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
// Component
import Modal from "../../../component/modal/modal"

const ModalUpdate = forwardRef((props, ref) => {

  const pemasok = useSelector(state => state.pemasok.data)
  const [dataForm, setDataForm] = useState(
    {
      nama_pemasok: '',
      no_telp: '',
      kota: '',
      alamat: ''
    }
  );
  const [open, setOpen] = useState(false)
  const [errorForm, setErrorForm] = useState({})

  const storeData = (e) => {
    e.preventDefault();
    const id = dataForm.id;
    const formData = new FormData(e.target);
    const token = localStorage.getItem('jwt');
    axios({
      method: 'POST',
      baseURL: `https://backend-minimarket.herokuapp.com/api/supplier/${id}`,
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
    setOpenModal(boolean, id) {
      const selectedData = pemasok.find(x => x.id === id)
      setDataForm(selectedData)
      setOpen(boolean)
    }
  }))

  return (
    <Modal isOpen={open} onCloseModal={() => setOpen(false) || setErrorForm({})}>
      <form onSubmit={storeData}>
        <input type="hidden" name="_method" defaultValue="PUT" />
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="mb-2">
            <h2 className="text-2xl text-indigo-500 font-bold">Edit Pemasok</h2>
          </div>
          <div className="mb-2">
            <label htmlFor="nama_pemasok" className="block text-sm text-gray-700">Nama Pemasok</label>
            <input 
              type="text" 
              name="nama_pemasok" 
              id="nama_pemasok" 
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.nama_pemasok ? 'border-red-500' : 'border-indigo-500'}`} 
              defaultValue={dataForm.nama_pemasok}
            />
            <span className="text-sm text-red-500">{errorForm.nama_pemasok}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="no_telp" className="block text-sm text-gray-700">No Telepon</label>
            <input
              type="text" 
              name="no_telp" 
              id="no_telp" 
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.no_telp ? 'border-red-500' : 'border-indigo-500'}`} 
              defaultValue={dataForm.no_telp}
            />
            <span className="text-sm text-red-500">{errorForm.no_telp}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="kota" className="block text-sm text-gray-700">Kota</label>
            <input 
              type="text" 
              name="kota" 
              id="kota" 
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.kota ? 'border-red-500' : 'border-indigo-500'}`} 
              defaultValue={dataForm.kota}
            />
            <span className="text-sm text-red-500">{errorForm.kota}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="alamat" className="block text-sm text-gray-700">Alamat</label>
            <textarea name="alamat" id="alamat" className={`w-full px-3 py-2 border rounded-md focus:outline-none resize-none ${errorForm.alamat ? 'border-red-500' : 'border-indigo-500'}`} defaultValue={dataForm.alamat}></textarea>
            <span className="text-sm text-red-500">{errorForm.alamat}</span>
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

export default ModalUpdate