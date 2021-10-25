import axios from "axios"
import { useState } from "react"
import Modal from "../../component/modal/modal";
import TableComp from "../../component/table/table"

export default function Pemasok() {
  const title = [
    'No', 'Nama Pemasok', 'No Telp', 'Alamat', 'Kota'
  ]
  const [open, setOpen] = useState(false);

  const storeData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios({
      method: 'POST',
      baseURL: 'http://127.0.0.1:8000/api/supplier',
      data: formData,
      headers: {
        'Authorization': 'Bearer 3|2mbhNYnsgw6ucKqZ4MiobU9YZh6UwH05xPVjdAPF'
      }
    })
    .then(res => {
      console.info(res)
    })
    .catch(err => {
      console.info(err.response.data)
    })
  }

  return (
    <main className="main-content main-bg">
      <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
        <div className="col-span-12 bg-white shadow rounded-md p-5">
          <div className="mb-5">
            <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring hover:bg-blue-600" onClick={() => setOpen(true)}>Tambah Pemasok</button>
          </div>
          <TableComp title={title} srOnly={true}> 
            
          </TableComp>
        </div>
      </div>

      <Modal isOpen={open} onCloseModal={() => setOpen(false)}>
        <form onSubmit={storeData}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-2">
              <h2 className="text-2xl text-indigo-500 font-bold">Pemasok Baru</h2>
            </div>
            <div className="mb-2">
              <label htmlFor="nama_pemasok" className="block text-sm text-gray-700">Nama Pemasok</label>
              <input type="text" name="nama_pemasok" id="nama_pemasok" className="w-full px-3 py-2 border border-indigo-500 rounded-md focus:outline-none" />
            </div>
            <div className="mb-2">
              <label htmlFor="no_telp" className="block text-sm text-gray-700">No Telepon</label>
              <input type="text" name="no_telp" id="no_telp" className="w-full px-3 py-2 border border-indigo-500 rounded-md focus:outline-none" />
            </div>
            <div className="mb-2">
              <label htmlFor="nama_pemasok" className="block text-sm text-gray-700">Kota</label>
              <input type="text" name="nama_pemasok" id="nama_pemasok" className="w-full px-3 py-2 border border-indigo-500 rounded-md focus:outline-none" />
            </div>
            <div className="mb-2">
              <label htmlFor="alamat" className="block text-sm text-gray-700">Alamat</label>
              <textarea name="alamat" id="alamat" className="w-full px-3 py-2 border border-indigo-500 rounded-md resize-none focus:outline-none"></textarea>
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </main>
  )
}