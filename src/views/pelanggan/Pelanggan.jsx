import React from "react"
import Swal from "sweetalert2"
import axios from "axios"
import { connect } from "react-redux"
import { addPelanggan } from "../../store/features/pelanggan/pelangganSlice"

// Component
import TableComp from "../../component/table/table"
import Pagination from "./Pagination"
import ModalCreate from "./Component/ModalCreate"
import ModalUpdate from "./Component/ModalUpdate"
import ModalDelete from "./Component/ModalDelete"

class Pelanggan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [
        'No', 'Nama', 'Email', 'No Telp', 'Alamat'
      ],
    }

    this.modalCreateRef = React.createRef();
    this.modalUpdateRef = React.createRef();
    this.modalDeleteRef = React.createRef();
  }

  componentDidMount() {
    let pelanggan = this.props.pelanggan;
    if(pelanggan.length === 0) {
      this.getData();
    }
  }

  getData() {
    const token = localStorage.getItem('jwt');
    axios({
      method: 'GET',
      baseURL: 'http://127.0.0.1:8000/api/customer',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      this.props.addPelanggan(res.data);
    })
  }

  handleSuccess(value) {
    this.getData()
    const [message, icon] = value
    this.showToast(message, icon)
  }

  handleError(value) {
    const [message, icon] = value
    this.showToast(message, icon)
  }

  showToast = (message, icon) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  render() {
    return (
      <main className="main-content main-bg">
        <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
          <div className="col-span-12 bg-white shadow rounded-md p-5">
            <h1 className="text-2xl text-indigo-500 font-bold">Daftar Pelanggan</h1>
          </div>
          <div className="col-span-12 bg-white shadow rounded-md p-5">
            <div className="mb-5">
              <button 
                className="px-4 py-2 mr-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:ring hover:bg-indigo-600" 
                onClick={() => this.modalCreateRef.current.setOpenModal(true)} >
                  Tambah Pelanggan
              </button>
              <input type="search" className="float-right px-3 py-2 rounded-md border border-indigo-500 focus:outline-none focus:ring" placeholder="Search" />
            </div>
            <TableComp title={this.state.title} srOnly={true}> 
              {
                this.props.pelanggan.map((item, index) => {
                  return (
                    <tr key={item.id} className="hover:bg-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.no_telp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.alamat}</td>
                      <td className="px-6 py-4 flex gap-1">
                        <button onClick={() => this.modalUpdateRef.current.setOpenModal(true, item.id)}>
                          <i className='bx bxs-edit text-green-400 text-lg' ></i>
                        </button>
                        <button onClick={() => this.modalDeleteRef.current.setOpenModal(true, item.id)}>
                          <i className='bx bx-trash text-red-500 text-lg' ></i>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </TableComp>
            <Pagination/>
          </div>
        </div>

        <ModalCreate
          ref={this.modalCreateRef} 
          onSuccess={(...value) => this.handleSuccess(value)} 
          onError={(...value) => this.handleError(value)} 
        />
        <ModalUpdate
          ref={this.modalUpdateRef} 
          onSuccess={(...value) => this.handleSuccess(value)} 
          onError={(...value) => this.handleError(value)} 
        />
        <ModalDelete
          ref={this.modalDeleteRef} 
          onSuccess={(...value) => this.handleSuccess(value)} 
          onError={(...value) => this.handleError(value)} 
        />
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  const { pelanggan } = state
  return {
    pelanggan: pelanggan.data
  }
}

const mapDispactToProps = (dispatch) => {
  return {
    addPelanggan: (value) => dispatch(addPelanggan(value))
  }
}


export default connect(mapStateToProps, mapDispactToProps)(Pelanggan);