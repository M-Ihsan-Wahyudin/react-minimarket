import { forwardRef ,useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
// Component
import ModalLarge from "../../../../component/modal/modalLarge";
import Table from "../../RootComponent/Table";
import logoputih from "../../../../assets/images/logoputih.svg"
import Method from "../../../../Function/Method";
import '../../RootComponent/font.css'

const ModalViewDetail = forwardRef((props, ref) => {

  const [open, setOpen] = useState(false)
  const [selectedData, setSelectedData] = useState({
    detail_penjualan: [],
    barang: [],
    user: {},
    tampung_bayar: {},
  })
  const laporan = useSelector(state => state.laporan)
  const title = [
    'No', 'Nama Barang', 'Harga', 'Satuan', 'Jumlah', 'Sub total'
  ];

  useImperativeHandle(ref, () => ({
    setOpenModal(boolean, id) {
      setOpen(boolean)
      let result = laporan.dataLaporanPenjualan.reportSale.find(x => x.id === id);
      setSelectedData(result)
    }
  }))

  return (
    <ModalLarge isOpen={open} onCloseModal={() => setOpen(false)}>
      <div>
        {/* bg-gradient-to-tr from-indigo-600 to-indigo-400 */}
        <section className="bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 lg:pb-20 px-4 lg:px-20 pt-5 pb-4 sm:p-6 sm:pb-4 grid grid-cols-12 gap-3">
          <div className="col-span-7 grid grid-cols-6 gap-5 text-white">
            <div className="col-span-6 flex items-center justify-start">
              <img className="h-20 w-20" src={logoputih} alt="" srcset="" />
              <div className="text-4xl font-bold tracking-widest uppercase oswald">Minimarket</div>
            </div>
            <div className="col-span-6 pl-5">
              <h2 className="text-6xl font-bold">Invoice</h2>
              <p># {selectedData.no_faktur}</p>
            </div>
          </div>
          <div className="col-span-5 text-white py-5 grid grid-col-6 gap-3">
            <div className="col-span-6">
              <h4 className="font-semibold text-lg tracking-wider">Date Information</h4>
              <p>{selectedData.tgl_faktur}</p>
            </div>
            <div className="col-span-6">
              <h4 className="font-semibold text-lg tracking-wider">Nama Pembeli</h4>
              <p>{selectedData.pelanggan ? selectedData.pelanggan.nama : '-'}</p>
            </div>
            <div className="col-span-6">
              <h4 className="font-semibold text-lg tracking-wider">Email</h4>
              <p>{selectedData.pelanggan ? selectedData.pelanggan.email : '-'}</p>
            </div>
            <div className="col-span-6">
              <h4 className="font-semibold text-lg tracking-wider">Phone Number</h4>
              {selectedData.pelanggan ? selectedData.pelanggan.no_telp : '-'}
            </div>
            <div className="col-span-6">
              <h4 className="font-semibold text-lg tracking-wider">Alamat</h4>
              {selectedData.pelanggan ? selectedData.pelanggan.alamat : '-'}
            </div>
          </div>
          {/* <p>Total Barang Masuk : {selectedData.total}</p>
          <p>Kota : {selectedData.pemasok.kota}</p>
          <p>Kasir</p>
          <p>Nama : {selectedData.user.name}</p>
          <p>email : {selectedData.user.email}</p> */}
        </section>
        <section className="mx-10">
          <div className="p-5 bg-white -mt-16 rounded-md">
            <Table title={title} srOnly={false}>
              {
                selectedData.detail_penjualan.map((item, index) => {
                  return (
                    <tr key={item.id} className={index % 2 !== 0 ? 'bg-gray-100' : ''}>
                      <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.barang.nama_barang}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{Method.formatNumber(item.barang.harga_jual)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.barang.satuan}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.jumlah}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{Method.formatNumber(item.sub_total)}</td>
                    </tr>
                  )
                })
              }
              <tr className="border-t border-gray-600">
                <td className="px-6 py-4 text-sm text-gray-900" colSpan={3} rowSpan={4}></td>
                <td className="px-6 py-4 text-sm text-gray-600">Sub total</td>
                <td className="px-6 py-4 text-sm text-gray-600">:</td>
                <td className="px-6 py-4 text-sm text-gray-600">{selectedData.tampung_bayar.total}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">Diskon</td>
                <td className="px-6 py-4 text-sm text-gray-600">:</td>
                <td className="px-6 py-4 text-sm text-gray-600">{selectedData.tampung_bayar.diskon}%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-white"><div className="w-full h-full rounded-md bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 text-sm">Grandtotal</div></td>
                <td className="px-6 py-4 text-sm text-gray-600">:</td>
                <td className="px-6 py-4 text-sm text-gray-600">{parseInt(selectedData.tampung_bayar.total) - (parseInt(selectedData.tampung_bayar.total) * parseInt(selectedData.tampung_bayar.diskon) / 100)}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-600">Kembalian</td>
                <td className="px-6 py-4 text-sm text-gray-600">:</td>
                <td className="px-6 py-4 text-sm text-gray-600">{selectedData.tampung_bayar.kembali}</td>
              </tr>
            </Table>
            <div className="w-full bg-gray-900 text-white text-md text-center p-3 rounded-md">
              Transaksi Selesai
            </div>
            <div className="grid grid-cols-6">
              <div className="col-span-3 px-6 py-4 text-sm text-gray-600">
                Date : {selectedData.tgl_faktur}
              </div>
              <div className="col-span-3 px-6 py-4 text-sm text-gray-600 text-right">
                Kasir : {selectedData.user.name}
              </div>
            </div>
          </div>
        </section>
      </div>
    </ModalLarge>
  )
})

export default ModalViewDetail