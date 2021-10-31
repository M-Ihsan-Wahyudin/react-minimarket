import { forwardRef , useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
// Component
import ModalLarge from "../../../../component/modal/modalLarge";
import Table from "../../../../component/table/table";

const ModalSelectPelanggan = forwardRef((props, ref) => {

  const [open, setOpen] = useState(false)
  const pelanggan = useSelector(state => state.pelanggan.data)
  const title = [
    'Nama', 'Email', 'No Telp', 'Alamat'
  ];

  useImperativeHandle(ref, () => ({
    setOpenModal(boolean) {
      setOpen(boolean)
    }
  }))

  return (
    <ModalLarge isOpen={open} onCloseModal={() => setOpen(false)}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <Table title={title} srOnly={true}>
          {
            pelanggan.map(item => {
              return (
                <tr key={item.id} className="hover:bg-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.no_telp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.alamat}</td>
                  <td className="px-6 py-4 flex gap-1">
                    <button className="px-4 py-2 bg-indigo-500 rounded-md text-white focus:outline-none focus:ring" onClick={() => props.onSelectPelanggan(item.id)}>
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

export default ModalSelectPelanggan