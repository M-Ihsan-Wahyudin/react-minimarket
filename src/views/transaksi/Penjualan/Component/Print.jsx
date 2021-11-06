import React, { Fragment } from "react";

export class Print extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="grid grid-cols-6 hidden print:inline">
        <div className="col-span-6 grid grid-cols-6">
          <div className="col-span-3 p-2">
            <div className="bg-purple-500 w-20 h-20 rounded-full mb-2">
            </div>
            <p className="text-left">{this.props.dataStruk.length === 0 ? 'Tidak ada kode Struk' : this.props.dataStruk.no_faktur}</p>
          </div>
          <div className="col-span-3 p-2">
            <p className="text-right mb-2">Toserba</p>
            <p className="text-right mb-2">Jl. Kh Abdullah bin, Cianjur, Jawa Barat</p>
            <p className="text-right mb-2">Pembeli : {this.props.dataStruk.pelanggan ? this.props.dataStruk.pelanggan.nama : '-'}</p>
          </div>
        </div>
        <div className="col-span-6 p-2">
          <hr className="mb-2" />
          <p className="text-left">Barang-barang yang dibeli :</p>
        </div>
        <div className="col-span-6 grid grid-cols-6">
          {
            this.props.dataStruk.length !== 0 ? 
              this.props.dataStruk.detail_penjualan.map(item => {
                return (
                  <Fragment key={item.id}>
                    <div className="col-span-1 p-2">
                      <p className="text-left">x{item.jumlah}</p>
                    </div>
                    <div className="col-span-3 p-2">
                      <p className="text-left">{item.barang.nama_barang}</p>
                    </div>
                    <div className="col-span-2 p-2">
                      <p className="text-right">Rp. {item.harga_jual}</p>
                    </div>
                  </Fragment>
                )
              })
            :
              <div></div>
          }
        </div>
        <Fragment>
          {
            this.props.dataStruk.length !== 0 ? 
            <Fragment>
              <div className="col-span-6 p-2">
                <hr className="mb-2" />
              </div>
              <div className="col-span-6 grid grid-cols-6">
                <div className="col-span-3 p-2">
                  <p className="text-left">Total Harga :</p>
                  <p className="text-left">Diskon :</p>
                  <p className="text-left font-bold">Tunai :</p>
                  <p className="text-left font-bold">Kembalian :</p>
                </div>
                <div className="col-span-3 p-2">
                  <p className="text-right">Rp. {this.props.dataStruk.tampung_bayar.total}</p>
                  <p className="text-right">{this.props.dataStruk.tampung_bayar.diskon}%</p>
                  <p className="text-right font-bold">Rp. {this.props.dataStruk.tampung_bayar.terima}</p>
                  <p className="text-right font-bold">Rp. {this.props.dataStruk.tampung_bayar.kembali}</p>
                </div>
              </div>
              <div className="col-span-6 p-2">
                <hr className="mb-1"/>
                <hr />
              </div>
              <div className="col-span-6 grid grid-cols-6">
                <div className="col-span-3 p-2">
                  <p className="text-left">Tanggal : {this.props.dataStruk.tgl_faktur}</p>
                </div>
                <div className="col-span-3 p-2">
                  <p className="text-right">Kasir : {this.props.dataStruk.user.name}</p>
                </div>
              </div>
              <div className="col-span-6 p-2">
                <hr className="mb-2" />
                <p className="text-center">Terimakasih telah berbelanja</p>
              </div>
            </Fragment>
            :
              <div></div>
          }
        </Fragment>
      </div>
    );
  }
}

// export default Print;