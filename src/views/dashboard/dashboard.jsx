import React from "react";
import CardData from "./Component/CardData";
import DataUserActivity from "./Component/DataUserActivity";
import DiagramLaporanBulanan from "./Component/DiagramLaporanBulanan";
import PolarBestSaleProduct from "./Component/PolarBestSaleProduct";

const Dashboard = () => {

  return (
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
  )
}

export default Dashboard;