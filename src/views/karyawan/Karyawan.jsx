import React from "react"
import Swal from "sweetalert2"
import axios from "axios"
import { connect } from "react-redux"
import { addKaryawan } from "../../store/features/karyawan/karyawanSlice"

// Component
import TableComp from "../../component/table/table"
import Pagination from "./component/pagination"
import ModalCreate from "./component/modalCreate"
import ModalDelete from "./component/modalDelete"
import AdminLayout from "../../layouts/admin"

class Karyawan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [
        'No', 'Nama', 'Email', 'Jabatan'
      ],
    }

    this.modalCreateRef = React.createRef();
    this.modalDeleteRef = React.createRef();
  }

  componentDidMount() {
    let karyawan = this.props.karyawan;
    if(karyawan.length === 0) {
      this.getData();
    }
  }

  getData() {
    const token = localStorage.getItem('jwt');
    axios({
      method: 'GET',
      baseURL: 'https://backend-minimarket.herokuapp.com/api/user',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      this.props.addKaryawan(res.data);
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
      <AdminLayout>
        <main className="main-content main-bg">
          <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
            <div className="col-span-12 bg-white shadow rounded-md p-5">
              <h1 className="text-2xl text-indigo-500 font-bold">Daftar karyawan</h1>
            </div>
            <div className="col-span-12 bg-white shadow rounded-md p-5">
              <div className="mb-5">
                <button 
                  className="px-4 py-2 mr-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:ring hover:bg-indigo-600" 
                  onClick={() => this.modalCreateRef.current.setOpenModal(true)} >
                    Tambah karyawan
                </button>
                <input type="search" className="float-right px-3 py-2 rounded-md border border-indigo-500 focus:outline-none focus:ring" placeholder="Search" />
              </div>
              <TableComp title={this.state.title} srOnly={true}> 
                {
                  this.props.karyawan.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.level}</td>
                        <td className="px-6 py-4 flex gap-1">
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
          <ModalDelete
            ref={this.modalDeleteRef} 
            onSuccess={(...value) => this.handleSuccess(value)} 
            onError={(...value) => this.handleError(value)} 
          />
        </main>
      </AdminLayout>
    )
  }
}

const mapStateToProps = (state) => {
  const { karyawan } = state
  return {
    karyawan: karyawan.data
  }
}

const mapDispactToProps = (dispatch) => {
  return {
    addKaryawan: (value) => dispatch(addKaryawan(value))
  }
}


export default connect(mapStateToProps, mapDispactToProps)(Karyawan);