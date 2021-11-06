import React from "react";
import { useSelector } from "react-redux";
import AdminLayout from "../../layouts/Admin";

const Home = () => {
  const userData = useSelector(state => state.userData.data);
  return (
    <AdminLayout>
      <main className="main-content main-bg">
        <div className="p-5 md:p-10 grid grid-cols-12 gap-5">
          <div className="col-span-12 bg-white shadow rounded-md p-5">
            <p className="text-2xl text-indigo-500 font-bold">Hello, <span className="text-2xl text-gray-800 font-bold">{userData.name}</span></p>
          </div>
          <div className="col-span-12 bg-white shadow rounded-md p-5">
            <h4 className="text-lg text-red-400 font-bold">This is your activity</h4>
          </div>
        </div>
      </main>
    </AdminLayout>
  )
}

export default Home;