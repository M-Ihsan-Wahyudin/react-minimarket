import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { addCategory } from "../../store/features/product/productSlice";
import Swal from "sweetalert2";

import TableComp from "../../component/table/table";
import ModalCreate from "./Component/ModalCreate";
import Pagination from "./Component/Pagination";
import ModalUpdate from "./Component/ModalUpdate";
import ModalDelete from "./Component/modalDelete";
import client from "../../api/client";
import Method from "../../Function/Method";
import AdminLayout from "../../layouts/Admin";


class Kategori extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [
        'No', 'Kategori', 'Referensi'
      ]
    }
    this.modalCreateRef = React.createRef();
    this.modalUpdateRef = React.createRef();
    this.modalDeleteRef = React.createRef();
  }

  componentDidMount() {
    let category = this.props.product.dataCategory;
    if(category.length === 0) {
      client.getCategory();
    }
  }

  getData() {
    let token = localStorage.getItem('jwt');
    axios({
      method: 'GET',
      baseURL: 'https://backend-minimarket.herokuapp.com/api/category',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.info(res)
      this.props.addCategory(res.data);
    })
  }

  handleSuccess(value) {
    client.getCategory();
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
                  onClick={() => this.modalCreateRef.current.setOpenModal(true)}>
                    Tambah Kategori
                </button>
                <input type="search" className="float-right px-3 py-2 rounded-md border border-indigo-500 focus:outline-none focus:ring" placeholder="Search" />
              </div>
              <TableComp title={this.state.title} srOnly={true}> 
                {
                  this.props.product.dataCategory.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama_produk}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.barang_count > 0 ? item.barang_count + ' Barang' : 'Tidak Ada'}</td>
                        <td className="px-6 py-4 flex gap-1">
                          <button onClick={() => this.modalUpdateRef.current.setOpenModal(true, item.id)}>
                            <i className='bx bxs-edit text-green-400 text-lg' ></i>
                          </button>
                          {
                            item.barang_count <= 0 ? 
                              <button onClick={() => this.modalDeleteRef.current.setOpenModal(true, item.id)}>
                                <i className='bx bx-trash text-red-500 text-lg' ></i>
                              </button>
                            : 
                              <button onClick={() => Method.showAlert('Oops..', 'Kategori ini tidak dapat dihapus karena memiliki referensi ke barang lain', 'warning')}>
                                <i className='bx bx-trash text-gray-500 text-lg' ></i>
                              </button>
                          }
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