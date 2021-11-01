import Table from "../../../component/table/table"
import Pagination from "./Component/Pagination"

export default function LaporanPenjualan() {
  const title = [
    'No', 'Kode Transaksi', 'Nama Pembeli', 'Tanggal Transaksi', 'Total Bayar'
  ];
  return (
    <main className="main-content main-bg">
      <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
        <div className="col-span-12 bg-white shadow rounded-md p-5">
          <h1 className="text-2xl text-indigo-500 font-bold">Laporan Penjualan</h1>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-2">
          <div className="col-span-2 flex justify-center items-center">
            <span className="p-1 bg-green-500 rounded-md shadow shadow-blue-400 flex justify-center items-center">
              <i className='bx bx-log-in-circle text-white text-6xl'></i>
            </span>
          </div>
          <div className="col-span-4">
            <h2 className="text-2xl text-gray-700">Uang Masuk</h2>
            <div className="text-xl text-gray-500">Rp. 2.000</div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-2">
          <div className="col-span-2 flex justify-center items-center">
            <span className="p-1 bg-red-500 rounded-md shadow shadow-blue-400 flex justify-center items-center">
              <i className='bx bx-log-out-circle text-white text-6xl'></i>
            </span>
          </div>
          <div className="col-span-4">
            <h2 className="text-2xl text-gray-700">Uang Keluar</h2>
            <div className="text-xl text-gray-500">Rp. 2.000</div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-2">
          <div className="col-span-2 flex justify-center items-center">
            <span className="p-1 bg-indigo-500 rounded-md shadow shadow-blue-400 flex justify-center items-center">
              <i className='bx bx-transfer-alt text-white text-6xl'></i>
            </span>
          </div>
          <div className="col-span-4">
            <h2 className="text-2xl text-gray-700">Jumlah Transaksi</h2>
            <div className="text-xl text-gray-500">423</div>
          </div>
        </div>

        <div className="col-span-12 bg-white shadow rounded-md p-5">
          <Table title={title} srOnly={true}>
            
          </Table>
          <Pagination/>
        </div>
      </div>
    </main>
  )
}