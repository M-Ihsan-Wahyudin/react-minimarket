import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import client from "../../api/client";
import AdminLayout from "../../layouts/admin";
import CardData from "./component/cardData";
import DataUserActivity from "./component/dataUserActivity";
import DiagramLaporanBulanan from "./component/diagramLaporanBulanan";
import PolarBestSaleProduct from "./component/polarBestSaleProduct";

const Dashboard = () => {
  const laporan = useSelector(state => state.laporan.data)
  useEffect(() => {
    if(laporan.length === 0) {
      client.getReportAllInOne();
    }
  })
  return (
    <AdminLayout>
      <main className="main-content main-bg">
      <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">

        <CardData/>

        <div className="col-span-8 p-5 bg-white shadow rounded-md">
          <DiagramLaporanBulanan/>
        </div>

        <div className="col-span-4 p-5 bg-white shadow rounded-md">
          <DataUserActivity/>
        </div>

        <div className="col-span-6 p-5 bg-white shadow rounded-md">
          <PolarBestSaleProduct/>
        </div>
      </div>
    </main>
    </AdminLayout>
  )
}

export default Dashboard;