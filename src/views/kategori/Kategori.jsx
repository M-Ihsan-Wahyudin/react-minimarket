import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { addCategory } from "../../store/features/product/productSlice";
import Swal from "sweetalert2";

import TableComp from "../../component/table/table";
import AdminLayout from "../../layouts/Admin";
import ModalCreate from "./component/ModalCreate";
import Pagination from "./component/Pagination";


class Kategori extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [
        'No', 'Kategori', 'Referensi'
      ]
    }
    this.modalCreateRef = React.createRef();
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let token = localStorage.getItem('jwt');
    axios({
      method: 'GET',
      baseURL: 'http://127.0.0.1:8000/api/category',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      this.props.addCategory(res.data);
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
              <h1 className="text-2xl text-indigo-500 font-bold">Daftar Kategori</h1>
            </div>
            <div className="col-span-12 bg-white shadow rounded-md p-5">
              <div className="mb-5">
                <button 
                  className="px-4 py-2 mr-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:ring hover:bg-indigo-600" 
                  onClick={() => this.modalCreateRef.current.setOpenModal(true)} 
                  >
                    Tambah Kategori
                  </
                button>
                <input type="search" className="float-right px-3 py-2 rounded-md border border-indigo-500 focus:outline-none focus:ring" placeholder="Search" />
              </div>
              <TableComp title={this.state.title} srOnly={true}> 
                {
                  this.props.product.dataCategory.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama_produk}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.barang}</td>
                        <td className="px-6 py-4 flex gap-1">
                          <button onClick={() => this.modalUpdateRef.current.setOpenModal(true, item.id)}>
                            <i className='bx bxs-edit text-green-400 text-lg' ></i>
                          </button>
                          <button>
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
        </main>

        <ModalCreate
          ref={this.modalCreateRef} 
          onSuccess={(...value) => this.handleSuccess(value)} 
          onError={(...value) => this.handleError(value)} 
        />
      </AdminLayout>
    )
  }
}

const mapStateToProps = (state) => {
  const { product } = state
  return {
    product: product
  }
}

const mapDispactToProps = (dispatch) => {
  return {
    addCategory: (value) => dispatch(addCategory(value)),
  }
}


export default connect(mapStateToProps, mapDispactToProps)(Kategori);