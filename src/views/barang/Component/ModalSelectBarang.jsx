import { forwardRef ,useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
// Component
import ModalLarge from "./ModalLarge";
import Table from "../../../component/table/table";

const ModalSelectBarang = forwardRef((props, ref) => {

  const [open, setOpen] = useState(false)
  const product = useSelector(state => state.product.data)
  const title = [
    'Nama Barang', 'Kategori', 'Harga Jual', 'Satuan', 'Stok'
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
          <h3 className="text-xl text-indigo-500 font-bold mb-5">Daftar Barang</h3>
          <input type="search" className="h-10 px-2 rounded-md border-2 border-gray-800 focus:outline-none focus:ring" autoFocus placeholder="Search" />
        </div>
        <Table title={title} srOnly={true}>
          {
            product.map(item => {
              return (
                <tr key={item.id} className="hover:bg-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama_barang}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.produk.nama_produk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.harga_jual}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.satuan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.stok}</td>
                  <td className="px-6 py-4 flex gap-1">
                    <button className="px-4 py-2 bg-indigo-500 rounded-md text-white focus:outline-none focus:ring" onClick={() => props.onSelectBarang(item.id)}>
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

export default ModalSelectBarang