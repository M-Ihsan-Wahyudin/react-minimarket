import { useState } from "react";

export default function LaporanPenjualan() {
  const [data, setData] = useState(0);

  return (
    <main className="main-content main-bg">
      <div className="bg-white p-5 m-5 rounded-md">
        laporan Penjualan {data}
      </div>
      <div className="bg-white p-5 m-5 rounded-md">
        <button onClick={() => setData(data + 1)}>Click me</button>
      </div>
    </main>
  )
}