import React from "react"
import Swal from "sweetalert2";
import { connect } from "react-redux";
import ModalSelectBarang from "./modal/ModalSelectBarang"
import Table from "../../component/table/table";
import AdminLayout from "../../layouts/Admin";
import Pagination from "../pemasok/Pagination";

class Pembelian extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: [
        'No', 'Nama Barang', 'Kategori', 'Harga Jual', 'Satuan', 'Qty'
      ],
      selectedBarang: [],
    }

    this.modalSelectProductRef = React.createRef();
  }



  // findProductById(id) {
  //   const dataProduct = selectedProduct.find(x => x.id === id);
  //   if (typeof dataProduct === 'undefined') {
  //     selectedProduct.push(product.find(x => x.id === id))
  //     setOpenModalLarge(false);
  //   } else {
  //     alert('barang sudah ada');
  //   }
  // }

  handleSelectBarang(id) {
    const selectedBarang = this.props.product.find(x => x.id === id)
    const obj = {
      selectedBarang
    }
    obj.qty = 1
    console.info(obj.selectedBarang)
    let join = this.state.selectedBarang.concat(selectedBarang)
    this.setState({
      selectedBarang: join
    })
    this.modalSelectProductRef.current.setOpenModal(false);
    console.info(this.state.selectedBarang);
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
              <h1 className="text-2xl text-indigo-500 font-bold">Transaksi Pembelian</h1>
            </div>
            <div className="col-span-8 bg-white shadow rounded-md p-5 grid grid-cols-6">
              <div className="col-span-3">
                <label htmlFor="nama_pemasok">Pilih Pemasok</label>
                <select name="nama_pemasok" id="nama_pemasok" className={`w-full px-3 py-2 border rounded-md focus:outline-none border-indigo-500`}>
                  {
                    this.props.pemasok.map(item => {
                      return (
                        <option key={item.id} value={item.id}>{item.nama_pemasok}</option>
                      )
                    })
                  }
                </select>
                <button className="px-4 py-2 rounded-md bg-indigo-500 text-white my-2" onClick={() => this.modalSelectProductRef.current.setOpenModal(true)}>Tambah Barang</button>
              </div>
            </div>
            <div className="col-span-4 bg-white shadow rounded-md p-5 grid grid-cols-6">
              <div className="col-span-6">
                <label htmlFor="total">Total Harga</label>
                <input name="total" id="total" className={`w-full px-3 py-2 border rounded-md focus:outline-none border-indigo-500 bg-gray-50`} defaultValue={0} disabled />
              </div>
            </div>
            <div className="col-span-12 bg-white shadow rounded-md p-5">
              <Table title={this.state.title} srOnly={true}>
                {
                  this.state.selectedBarang.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama_barang}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.produk.nama_produk}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.harga_jual}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.satuan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.qty}</td>
                        <td className="px-6 py-4 flex gap-1">
                          <button>Hehe</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </Table>
              <Pagination/>
            </div>
          </div>
    
          <ModalSelectBarang
            ref={this.modalSelectProductRef} 
            onSuccess={(...value) => this.handleSuccess(value)} 
            onError={(...value) => this.handleError(value)}

            onSelectBarang={(id) => this.handleSelectBarang(id) }
          />
        </main>
      </AdminLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pemasok: state.pemasok.data,
    product: state.product.data
  }
}

export default connect(mapStateToProps)(Pembelian);