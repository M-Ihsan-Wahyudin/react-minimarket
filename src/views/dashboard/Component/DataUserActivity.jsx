import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import people1 from '../../../assets/images/people.jpg'

export default function DataUserActivity() {
  const { data } = useSelector(state => state.laporan)

  return (
    <Fragment>
      <div className="block text-red-400 text-lg mb-5">Aktivitas User</div>
      {
        typeof data.userActivity !== 'undefined' ?
          data.userActivity.map((item, index) => {
            return (
              <div className='grid grid-cols-6 py-1 my-1' key={index}>
                <div className="col-span-1">
                  <div className="h-14 w-14 rounded-full mx-auto overflow-hidden">
                    <img src={people1} alt={people1} className='w-full h-full object-cover rounded-full' />
                  </div>
                </div>
                <div className="col-span-5">
                  <span className='block font-bold text-indigo-500'>{item.name}</span>
                  <span className='text-gray-500'>Melakukan {item.pembelian_count + item.penjualan_count} Transaksi</span>
                </div>
              </div>
            )
          })
        :
          <Fragment/>
      }
    </Fragment>
  )
}