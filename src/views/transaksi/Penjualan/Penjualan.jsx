import React from "react"
import Swal from "sweetalert2"
import { connect } from "react-redux"
import ReactToPrint from "react-to-print"

// Component
import Table from "../../../component/table/table"
import Pagination from "./Component/Pagination"
import { Print } from "./Component/Print"
import ModalSelectBarang from "./Component/ModalSelectBarang"
import ModalSelectPelanggan from "./Component/ModalSelectPelanggan"

// Function
import Method from '../../../Function/Method'

// Client API
import client from "../../../api/client"
import AdminLayout from "../../../layouts/Admin"

class Pembelian extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: [
        'No', 'Nama Barang', 'Kategori', 'Harga Barang', 'Satuan', 'Qty'
      ],
      selectedBarang: [],
      selectedPelanggan: {
        id: ''
      },
      total_harga: 0,
      total_bayar: 0,
      diskon: 0,
      kembali: 0,
      grandtotal: 0,
      tgl_faktur: Method.getCurrentDate(),
      errors: [],
      dataStruk: [],
    }

    this.modalSelectProductRef = React.createRef();
    this.ModalSelectPelangganRef = React.createRef();
    this.printRef = React.createRef();
  }

  componentDidMount() {
    if(this.props.pelanggan.length === 0) {
      client.getPelanggan();
    }
    if(this.props.product.length === 0) {
      client.getProduct();
    }
  }

  storeData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if(this.validation()) {
      client.postPenjualan(formData, (status, res) => {
        if(status) {
          this.setState({dataStruk: res.data.data});
          Method.showToast(res.data.message, 'success');
          Swal.fire({
            title: 'Transaksi Berhasil',
            icon: 'success',
            confirmButtonText: 'Lanjut',
          }).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Uang Kembalian',
              text: 'Rp. ' + res.data.data.tampung_bayar.kembali,
              showCancelButton: true,
              cancelButtonText: 'Kembali',
              confirmButtonText: 'Cetak Struk',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                document.getElementById('button-print').click();
              }
            })
          })
          client.getProduct();
          this.resetForm();
        } else {
          console.info(res.response.data)
          this.setState({
            errors: res.response.data.errors
          });
          Method.showToast(res.response.data.message, 'error')
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

  handleSelectPelanggan(id) {
    const selectedPelanggan = this.props.pelanggan.find(x => x.id === id)
    this.setState({ selectedPelanggan })
    this.ModalSelectPelangganRef.current.setOpenModal(false);
  }

  
  handleSuccess(value) {
    this.getData()
    const [message, icon] = value
    Method.showToast(message, icon)
  }

  handleError(value) {
    const [message, icon] = value
    Method.showToast(message, icon)
  }

  removeItem(index) {
    this.state.selectedBarang.splice(index, 1);
    this.calculate();
  }

  calculate() {
    const selectedBarang = this.state.selectedBarang;
    let totalHarga = 0;
    for(let i = 0; i < selectedBarang.length; i++) {
      totalHarga += selectedBarang[i].harga_jual * selectedBarang[i].qty
    }
    let diskon = Math.ceil((totalHarga * this.state.diskon) / 100);
    let kembali = this.state.total_bayar - (totalHarga - diskon);
    if(kembali < 0) {
      kembali = 0;
    }
    this.setState({
      total_harga: totalHarga,
      grandtotal: totalHarga - diskon,
      kembali: kembali
    })
  }

  countQty(e, id) {
    const newObj = this.state.selectedBarang
    const i = this.state.selectedBarang.findIndex(x => x.id === id)
    let qty = parseInt(e.target.value)
    if(qty !== '' && qty >= 0) {
      newObj[i].qty = qty
      this.setState({ selectedBarang: newObj })
    } else {
      newObj[i].qty = 0
      this.setState({ selectedBarang: newObj })
    }
    setTimeout(() => {
      this.calculate()
    }, 50)
  }

  countDiskon(e) {
    let diskon = parseInt(e.target.value)
    if(diskon !== '' && diskon >= 0) {
      if(diskon <= 100) {
        this.setState({ diskon: diskon })
      } else {
        this.setState({ diskon: 100 })
      }
    } else {
      this.setState({ diskon: 0 })
    }
    setTimeout(() => {
      this.calculate()
    }, 50)
  }
  
  countTotalBayar(e) {
    let totalBayar = parseInt(e.target.value)
    if(totalBayar !== '' && totalBayar >= 0) {
      this.setState({ total_bayar: totalBayar })
    } else {
      this.setState({ total_bayar: 0 })
    }
    setTimeout(() => {
      this.calculate()
    }, 50)
  }

  validation() {
    let barang = this.state.selectedBarang;
    if(barang.length <= 0) {
      Method.showAlert('Oops...', 'Pilih Barang Dulu...!!!', 'warning');
      return false
    } else {
      let totalBayar = this.state.total_bayar
      let grandtotal = this.state.grandtotal
      if(totalBayar < grandtotal) {
        Method.showAlert('Oops...', 'Uang Anda Kurang...!!!', 'warning');
        return false
      } else {
        return true
      }
    }
  }

  resetForm() {
    this.setState({
      selectedBarang: [],
      selectedPelanggan: { id: '' },
      total_harga: 0,
      total_bayar: 0,
      diskon: 0,
      kembali: 0,
      grandtotal: 0,
      tgl_faktur: Method.getCurrentDate(),
      errors: [],
    });
  }

  render() {
    return (
      <AdminLayout>
        <main className="main-content main-bg">
          <form onSubmit={this.storeData}>
            {/* <input type="hidden" name="kembali" value={this.state.kembali} readOnly/> */}
            <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
              <div className="col-span-12 bg-white shadow rounded-md p-5">
                <h1 className="text-2xl text-indigo-500 font-bold">Transaksi Penjualan</h1>
              </div>
              <div className="col-span-4 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-3">
                <div className="col-span-6 flex items-center gap-2">
                  <button type="button" className="h-10 px-4 py-2 rounded-md text-white bg-indigo-500 focus:outline-none focus:ring" onClick={() => this.ModalSelectPelangganRef.current.setOpenModal(true)}>Pilih Pelanggan</button>
                  {
                    this.state.selectedPelanggan.id === '' ?
                      <p className="text-lg text-gray-700">(Opsional)</p>
                    : 
                      ''
                  }
                </div>
                <div className="col-span-6">
                  <input type="hidden" name="pelanggan_id" value={this.state.selectedPelanggan.id} />
                  <table className="block">
                    <tbody>
                      <tr>
                        <td>Nama</td>
                        <td className="px-5">:</td>
                        <td>{this.state.selectedPelanggan.nama}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td className="px-5">:</td>
                        <td>{this.state.selectedPelanggan.email}</td>
                      </tr>
                      <tr>
                        <td>No Telp</td>
                        <td className="px-5">:</td>
                        <td>{this.state.selectedPelanggan.no_telp}</td>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <td className="px-5">:</td>
                        <td>{this.state.selectedPelanggan.alamat}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-span-6">
                  {
                    this.state.selectedPelanggan.id !== '' ?
                      <button 
                        type="button" 
                        className="h-10 px-4 py-2 rounded-md text-white bg-red-500 focus:outline-none focus:ring" 
                        onClick={() => this.setState({ selectedPelanggan: { id: '' } })} >
                          Hapus
                      </button>
                    : 
                      ''
                  }
                </div>
              </div>
              <div className="col-span-8 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-3">
                <div className="col-span-3">
                  <p className="text-lg text-gray-500">Tanggal Transaksi</p>
                  <h2 className="text-xl text-gray-800 px-1">{this.state.tgl_faktur}</h2>
                  <input type="hidden" name="tgl_faktur" id="tgl_faktur" value={this.state.tgl_faktur} readOnly/>
                </div>
                <div className="col-span-3">
                  <p className="text-lg text-gray-500">Grandtotal</p>
                  <h2 className="text-4xl text-gray-800">Rp. {Method.formatNumber(this.state.grandtotal)}</h2>
                </div>
                <div className="col-span-3">
                  <p className="text-lg text-gray-500">Total Harga</p>
                  <h2 className="text-xl text-gray-800">Rp. {Method.formatNumber(this.state.total_harga)}</h2>
                  <input type="hidden" name="total_harga" id="total_harga" value={this.state.total_harga} readOnly/>
                  <input type="hidden" name="grandtotal" value={this.state.grandtotal} readOnly/>
                </div>
                <div className="col-span-3">
                  <p className="text-lg text-gray-500">Kembalian</p>
                  <h2 className="text-xl text-gray-800">Rp. {Method.formatNumber(this.state.kembali)}</h2>
                  <input type="hidden" name="kembali" id="kembali" value={this.state.kembali} readOnly/>
                </div>
                <div className="col-span-3">
                  <label htmlFor="diskon" className="text-lg text-gray-500">Diskon (%)</label>
                  <input type="tel" pattern="[0-9]*" name="diskon" id="diskon" className={`w-full px-3 py-2 border rounded-md focus:outline-none border-indigo-500 ${this.state.selectedBarang.length === 0 ? 'bg-gray-50' : ''}`} value={this.state.diskon} onChange={(e) => this.countDiskon(e)} readOnly={this.state.selectedBarang.length === 0 ? true : false} />
                </div>
                <div className="col-span-3">
                  <label htmlFor="total_bayar" className="text-lg text-gray-500">Total Bayar</label>
                  <input type="tel" pattern="[0-9]*" name="total_bayar" id="total_bayar" className={`w-full px-3 py-2 border rounded-md focus:outline-none border-indigo-500 ${this.state.selectedBarang.length === 0 ? 'bg-gray-50' : ''}`} value={this.state.total_bayar} onChange={(e) => this.countTotalBayar(e)} readOnly={this.state.selectedBarang.length === 0 ? true : false}/>
                </div>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.harga_jual}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.satuan}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <input type="hidden" name={`barang[${index}][barang_id]`} value={item.id} />
                            <input type="hidden" name={`barang[${index}][harga_jual]`} value={item.harga_jual} />
                            <input type="tel" pattern="[0-9]*" name={`barang[${index}][jumlah]`} className="w-20 px-4 py-2 border rounded-md text-center focus:ring focus:outline-none" value={item.qty} onChange={(e) => this.countQty(e,item.id)}/>
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
              <div className="col-span-4">
              <ReactToPrint
                trigger={() => <button type="button" className="hidden" id="button-print">Print this out!</button>}
                content={() => this.printRef.current}
              />
              <Print ref={this.printRef} dataStruk={this.state.dataStruk} />
              </div>
            </div>
          </form>

    
          <ModalSelectBarang
            ref={this.modalSelectProductRef} 
            onSuccess={(...value) => this.handleSuccess(value)} 
            onError={(...value) => this.handleError(value)}

            onSelectBarang={(id) => this.handleSelectBarang(id) }
          />
          <ModalSelectPelanggan
            ref={this.ModalSelectPelangganRef} 
            onSuccess={(...value) => this.handleSuccess(value)} 
            onError={(...value) => this.handleError(value)}

            onSelectPelanggan={(id) => this.handleSelectPelanggan(id) }
          />
        </main>
      </AdminLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product.data,
    pelanggan: state.pelanggan.data
  }
}


export default connect(mapStateToProps)(Pembelian);