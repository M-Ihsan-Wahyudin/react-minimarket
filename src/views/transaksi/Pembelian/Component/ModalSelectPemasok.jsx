import { forwardRef ,useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
// Component
import ModalLarge from "../../../../component/modal/modalLarge";
import Table from "../../../../component/table/table";

const ModalSelectPemasok = forwardRef((props, ref) => {

  const [open, setOpen] = useState(false)
  const pemasok = useSelector(state => state.pemasok.data)
  const title = [
    'Nama Pemasok', 'No Telp', 'Kota', 'Alamat'
  ];

  useImperativeHandle(ref, () => ({
    setOpenModal(boolean) {
      setOpen(boolean)
    }
  }))

  return (
    <ModalLarge isOpen={open} onCloseModal={() => setOpen(false)}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex justify-between">
          <h3 className="text-xl text-indigo-500 font-bold mb-5">Daftar Pemasok</h3>
          <input type="search" className="h-10 px-2 rounded-md border-2 border-gray-800 focus:outline-none focus:ring" autoFocus placeholder="Search" />
        </div>
        <Table title={title} srOnly={true}>
          {
            pemasok.map(item => {
              return (
                <tr key={item.id} className="hover:bg-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama_pemasok}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.no_telp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.kota}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.alamat}</td>
                  <td className="px-6 py-4 flex gap-1 justify-center">
                    <button className="px-4 py-2 bg-indigo-500 rounded-md text-white focus:outline-none focus:ring" onClick={() => props.onSelectPelangan(item.id) || setOpen(false)}>
                      Pilih
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </Table>
      </div>
    </ModalLarge>
  )
})

export default ModalSelectPemasok