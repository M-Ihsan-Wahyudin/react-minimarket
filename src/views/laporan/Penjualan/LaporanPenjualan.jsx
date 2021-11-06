import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import client from "../../../api/client";
import Table from "../../../component/table/table"
import Method from "../../../Function/Method";
import AdminLayout from "../../../layouts/Admin";
import ModalViewDetail from "./Component/ModalViewDetail";
import Pagination from "./Component/Pagination"

export default function LaporanPenjualan() {
  const data = useSelector(state => state.laporan);
  const title = [
    'No', 'No Faktur', 'Tanggal Faktur', 'Kasir', 'Pembeli'
  ];
  const modalViewDetailRef = useRef();

  useEffect(() => {
    if(data.dataLaporanPenjualan.reportSale.length === 0)  {
      client.getAllReportSale();
    }
    if(data.data.length === 0) {
      client.getReportAllInOne();
    }
  })
  return (
    <AdminLayout>
      <main className="main-content main-bg">
        <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
          <div className="col-span-12 bg-white shadow rounded-md p-5">
            <h1 className="text-2xl text-indigo-500 font-bold">Laporan Penjualan</h1>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-2">
            <div className="col-span-2 flex justify-center items-center">
              <span className="p-1 bg-green-500 rounded-md shadow shadow-blue-400 flex justify-center items-center">
                <i className='bx bx-dollar-circle text-white text-6xl'></i>
              </span>
            </div>
            <div className="col-span-4">
              <h2 className="text-2xl text-gray-700">Jumlah Pemasukan</h2>
              <div className="text-xl text-gray-500">Rp {data.data.inCome ? Method.formatNumber(data.data.inCome) : 0}</div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-2">
            <div className="col-span-2 flex justify-center items-center">
              <span className="p-1 bg-indigo-500 rounded-md shadow shadow-blue-400 flex justify-center items-center">
                <i className='bx bx-transfer-alt text-white text-6xl'></i>
              </span>
            </div>
            <div className="col-span-4">
              <h2 className="text-2xl text-gray-700">Jumlah Transaksi</h2>
              <div className="text-xl text-gray-500">{data.dataLaporanPenjualan.countTransactionSale}</div>
            </div>
          </div>

          <div className="col-span-12 bg-white shadow rounded-md p-5">
            <Table title={title} srOnly={true}>
              {
                data.dataLaporanPenjualan.reportSale.map((item, index) => {
                  return (
                    <tr key={item.id} className="hover:bg-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.no_faktur}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.tgl_faktur}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.pelanggan === null ? '-' : item.pelanggan.nama}</td>
                      <td className="px-6 py-4 flex gap-1">
                        <button onClick={() => modalViewDetailRef.current.setOpenModal(true, item.id)}>
                          <i className='bx bxs-file-find text-indigo-500 text-2xl' ></i>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </Table>
            <Pagination/>
          </div>
        </div>

        <ModalViewDetail ref={modalViewDetailRef} />

      </main>
    </AdminLayout>
  )
}