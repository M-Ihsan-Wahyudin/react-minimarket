import React, { Fragment } from 'react'
import axios from 'axios'
import people1 from '../../../assets/images/people.jpg'

class DataUserActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: [],
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    axios({
      method: 'GET',
      baseURL: 'http://127.0.0.1:8000/api/report/useractivity',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      this.setState({dataUser: res.data})
    })
  }

  render() {
    return (
      <Fragment>
        <div className="block text-red-400 text-lg mb-5">Aktivitas User</div>
        {
          this.state.dataUser.map((item, index) => {
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
        }
      </Fragment>
    )
  }
}

export default DataUserActivity