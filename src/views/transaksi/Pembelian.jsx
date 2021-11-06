import React from "react"
import Swal from "sweetalert2"
import { connect } from "react-redux"
import ModalSelectBarang from "./modal/ModalSelectBarang"
import Table from "../../component/table/table"
import Pagination from "../pemasok/pagination"
import client from "../../api/client"
import Method from "../../Function/method"
import AdminLayout from "../../layouts/admin"

class Pembelian extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: [
        'No', 'Nama Barang', 'Kategori', 'Harga Beli', 'Harga Jual', 'Satuan', 'Qty'
      ],
      selectedBarang: [],
      selectedPemasok: {
        id: '',
        no_telp: '',
        kota: '',
        alamat: '',
      },
      totalHarga: 0,
      totalBarang: 0,
      tanggal_masuk: '',
      errors: [],
    }

    this.modalSelectProductRef = React.createRef();
  }

  componentDidMount() {
    if(this.props.pemasok.length === 0) {
      client.getPemasok();
    }
    if(this.props.product.length === 0) {
      client.getProduct();
    }
  }

  storeData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if(this.validation()) {
      client.postPembelian(formData, (status, res) => {
        if(status) {
          Method.showAlert(res.data.message, 'Stock Already Added', 'success')
          client.getProduct();
          client.getReportAllInOne();
          this.resetForm();
        } else {
          this.setState({
            errors: res.response.data.errors
          });
          this.showToast(res.response.data.message, 'error')
        }
      })
    }
  }
  
  handleSelectBarang(id) {
    const selectedBarang = this.props.product.find(x => x.id === id)
    const isAvailable = this.state.selectedBarang.findIndex(x => x.id === id)
    if(isAvailable < 0) {
      const newObj = {
        ...selectedBarang,
        qty: 1
      }
      let join = this.state.selectedBarang.concat(newObj)
      this.setState({
        selectedBarang: join
      })
      this.modalSelectProductRef.current.setOpenModal(false);
    } else {
      const newObj = this.state.selectedBarang;
      const i = isAvailable;
      newObj[i].qty = newObj[i].qty + 1;
      this.setState({
        selectedBarang: newObj
      })
      this.modalSelectProductRef.current.setOpenModal(false);
    }
    setTimeout(() => {
      this.calculate();
    }, 10);
  }

  handleSelectPemasok(e) {
    const selectedPemasok = this.props.pemasok.find(x => x.id === parseInt(e.target.value))
    this.setState({
      selectedPemasok: selectedPemasok
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

  removeItem(index) {
    this.state.selectedBarang.splice(index, 1);
    this.calculate();
  }

  calculate() {
    const selectedBarang = this.state.selectedBarang;
    let totalHarga = 0;
    let totalBarang = 0;
    for(let i = 0; i < selectedBarang.length; i++) {
      totalHarga += selectedBarang[i].harga_jual * selectedBarang[i].qty
      totalBarang += selectedBarang[i].qty
    }
    this.setState({
      totalHarga: totalHarga,
      totalBarang: totalBarang
    })
  }

  countQty(e, id) {
    const newObj = this.state.selectedBarang
    const i = this.state.selectedBarang.findIndex(x => x.id === id)
    if(e.target.value !== '' && e.target.value >= 0) {
      newObj[i].qty = parseInt(e.target.value)
      this.setState({
        selectedBarang: newObj
      })
    } else {
      newObj[i].qty = 0
      this.setState({
        selectedBarang: newObj
      })
    }
    this.calculate()
  }

  countHargaJual(e, id) {
    const newObj = this.state.selectedBarang
    const i = this.state.selectedBarang.findIndex(x => x.id === id)
    if(e.target.value !== '' && e.target.value >= 0) {
      newObj[i].harga_jual = parseInt(e.target.value)
      this.setState({
        selectedBarang: newObj
      })
    } else {
      newObj[i].harga_jual = 0
      this.setState({
        selectedBarang: newObj
      })
    }
    this.calculate()
  }

  showToast(message, icon) {
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

  showAlert(message, icon) {
    Swal.fire({
      icon: icon,
      title: 'Oops...',
      text: message,
      confirmButtonText: 'Kembali'
    })
  }

  validation() {
    let pemasok = this.state.selectedPemasok.id
    if(pemasok === '') {
      this.showAlert('Pilih Pemasok dulu...!!!', 'warning')
      return false
    } else {
      let barang = this.state.selectedBarang
      if(barang.length === 0) {
        this.showAlert('Pilih Barang dulu...!!!', 'warning')
        return false
      } else {
        return true
      }
    }
  }

  resetForm() {
    this.setState({
      selectedBarang: [],
      selectedPemasok: {
        id: '',
        no_telp: '',
        kota: '',
        alamat: '',
      },
      totalHarga: 0,
      totalBarang: 0,
      tanggal_masuk: '',
      errors: [],
    });
  }

  render() {
    return (
      <AdminLayout>
        <main className="main-content main-bg">
          <form onSubmit={this.storeData}>
            <input type="hidden" name="total" value={this.state.totalBarang} />
            <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
              <div className="col-span-12 bg-white shadow rounded-md p-5">
                <h1 className="text-2xl text-indigo-500 font-bold">Transaksi Pembelian</h1>
              </div>
              <div className="col-span-8 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-3">
                <div className="col-span-3">
                  <label htmlFor="pemasok_id">Pemasok</label>
                  <select 
                    name="pemasok_id" 
                    id="pemasok_id" 
                    className={`w-full px-3 py-3 text-md border rounded-md focus:outline-none ${this.state.errors.pemasok_id ? `border-red-500` : `border-indigo-500`}`}
                    onChange={(e) => this.handleSelectPemasok(e)} 
                    defaultValue=""
                  >
                    <option disabled value=""> -- Pilih Pemasok -- </option>
                    {
                      this.props.pemasok.map(item => {
                        return (
                          <option key={item.id} value={item.id}>{item.nama_pemasok}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="col-span-3">
                  <label htmlFor="tanggal_masuk">Tanggal Masuk</label>
                  <input type="date" name="tanggal_masuk" id="tanggal_masuk" 
                    className={`w-full px-3 py-2 text-md border rounded-md focus:outline-none ${this.state.errors.tanggal_masuk ? 'border-red-500' : 'border-indigo-500'}`} 
                    onChange={(e) => this.setState({tanggal_masuk: e.target.value})}
                    value={this.state.tanggal_masuk}
                  />
                </div>
                <div className="col-span-3">
                  <label htmlFor="no_telp">Nomor Telepon</label>
                  <input type="text" name="no_telp" id="no_telp" className="w-full px-3 py-2 border rounded-md focus:outline-none border-indigo-500 bg-gray-50" disabled value={this.state.selectedPemasok.no_telp}/>
                </div>
                <div className="col-span-3">
                  <label htmlFor="kota">Kota</label>
                  <input type="text" name="kota" id="kota" className="w-full px-3 py-2 border rounded-md focus:outline-none border-indigo-500 bg-gray-50" disabled value={this.state.selectedPemasok.kota}/>
                </div>
                <div className="col-span-6">
                  <label htmlFor="alamat">Alamat</label>
                  <textarea name="alamat" id="alamat" className="w-full px-3 py-2 border rounded-md focus:outline-none border-indigo-500 resize-none bg-gray-50" disabled value={this.state.selectedPemasok.alamat}></textarea>
                </div>
              </div>
              <div className="col-span-4 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-3">
                <div className="col-span-6">
                  <label htmlFor="total">Total Barang</label>
                  <input type="text" id="total" className={`w-full px-3 py-2 border rounded-md focus:outline-none border-indigo-500 bg-gray-50`} value={this.state.totalBarang} disabled />
                </div>
                <div className="col-span-6">
                  <label htmlFor="totalHarga">Total Harga</label>
                  <input type="text" name="totalHarga" id="totalHarga" className={`w-full px-3 py-2 border rounded-md focus:outline-none border-indigo-500 bg-gray-50`} value={this.state.totalHarga} disabled />
                </div>
                <div className="col-span-6 py-4"></div>
                <div className="col-span-6">
                  <button type="submit" className="float-right px-4 py-2 rounded-md text-white bg-indigo-500 focus:outline-none focus:ring">Save</button>
                </div>
              </div>
              <div className="col-span-12 bg-white shadow rounded-md p-5">
                  <button type="button" className="px-4 py-2 rounded-md bg-indigo-500 text-white my-2 focus:ring" onClick={() => this.modalSelectProductRef.current.setOpenModal(true)}>Tambah Barang</button>
                  <Table title={this.state.title} srOnly={true}>
                    {
                      this.state.selectedBarang.map((item, index) => {
                        return (
                          <tr key={index} className="hover:bg-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama_barang}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.produk.nama_produk}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <input 
                                type="number" 
                                name={`barang[${index}][harga_beli]`} 
                                className={
                                  (!this.state.errors[`barang.${index}.harga_beli`]) ? 
                                    `px-4 py-2 border rounded-md text-center focus:ring focus:outline-none` 
                                  : 
                                    `px-4 py-2 border rounded-md text-center focus:ring focus:outline-none border-red-500`
                                  } 
                                min={0}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <input 
                                type="number" 
                                name={`barang[${index}][harga_jual]`} 
                                className={
                                    `px-4 py-2 border rounded-md text-center focus:ring focus:outline-none ${this.state.errors[`barang.${index}.harga_jual`] ? 'border-red-500' : ''}` 
                                  }  
                                min={0} 
                                value={item.harga_jual} 
                                onChange={(e) => this.countHargaJual(e,item.id)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.satuan}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <input type="hidden" name={`barang[${index}][barang_id]`} value={item.id} />
                              <input type="number" name={`barang[${index}][jumlah]`} className="px-4 py-2 border rounded-md text-center focus:ring focus:outline-none" max={100} min={0} value={item.qty} onChange={(e) => this.countQty(e,item.id)}/>
                            </td>
                            <td className="px-6 py-4">
                              <button type="button" onClick={() => this.removeItem(index)}>
                                <i className='bx bx-trash text-red-500 text-lg'></i>
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </Table>
                  <Pagination/>
              </div>
            </div>
          </form>
    
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