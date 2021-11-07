import { forwardRef ,Fragment,useImperativeHandle, useState } from "react"
import { useSelector } from "react-redux"
import client from "../../../api/client";
// Component
import Modal from "../../../component/modal/modal"
import Method from "../../../Function/Method";
// import ModalSelectBarang from "./ModalSelectBarang"

const modalBarangKadaluarsa = forwardRef((props, ref) => {
  const product = useSelector(state => state.product.data);
  const [open, setOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState({
    id: '',
    kode_barang: '',
    nama_barang: '',
    harga_jual: '',
    produk: {nama_produk: ''},
    produk_id: '',
    satuan: '',
    stok: '',
  });
  // const modalSelectBarangRef = useRef();

  const handleSelectBarang = (e) => {
    const selected = product.find(x => x.id === parseInt(e.target.value))
    setSelectedBarang(selected);
  }

  const storeData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    client.postBarangKadaluarsa(formData, (status, res) => {
      if(status) {
        Method.showToast(res.data.message, 'success')
        setSelectedBarang({
          id: '',
          kode_barang: '',
          nama_barang: '',
          harga_jual: '',
          produk: {nama_produk: ''},
          produk_id: '',
          satuan: '',
          stok: '',
        })
        setOpen(false)
        client.getBarangKadaluarsa();
        client.getProduct();
      } else {
        console.info(res.response);
        Method.showToast(res.response.data.message, 'danger')
      }
    })
  }

  useImperativeHandle(ref, () => ({
    setOpenModal(boolean) {
      setOpen(boolean)
    }
  }))

  return (
    <Fragment>
      <Modal isOpen={open} onCloseModal={() => setOpen(false)}>
        <form onSubmit={storeData}>
          <div className="grid grid-cols-12 p-5 gap-2">
            <div className="col-span-12">
              <h4 className="text-indigo-500 text-2xl font-bold">Masukan Barang Kadaluarsa</h4>
            </div>
            {/* <div className="col-span-12">
              <button type="button" className="px-4 py-2 rounded-md bg-indigo-500 text-white focus:outline-none focus:ring" onClick={() => modalSelectBarangRef.current.setOpenModal(true)}>Pilih Barang</button>
            </div> */}
            <div className="col-span-12">
              <label className="block text-gray-700">Nama Barang</label>
              <select name="barang_id" className="w-full p-2 rounded-md border border-indigo-400 focus:outline-none focus:ring" onChange={(e) => handleSelectBarang(e)} defaultValue={''}>
                <option disabled value="" selected> -- Pilih Barang -- </option>
                {
                  product.map(item => {
                    return (
                      <option key={item.id} value={item.id}>{item.nama_barang}</option>
                    )
                  })
                }
              </select>
              <input type="hidden" name="nama_barang" value={selectedBarang.nama_barang}/>
            </div>
            <div className="col-span-12">
              <label className="block text-gray-700">Kategori</label>
              <input type="text" className="w-full p-2 rounded-md border border-indigo-400 focus:outline-none focus:ring bg-gray-50" value={selectedBarang.produk.nama_produk} readOnly/>
              <input type="hidden" name="produk_id" value={selectedBarang.produk_id} readOnly/>
            </div>
            <div className="col-span-12">
              <label className="block text-gray-700">Harga Barang</label>
              <input type="text" name="harga" className="w-full p-2 rounded-md border border-indigo-400 focus:outline-none focus:ring bg-gray-50" value={selectedBarang.harga_jual} readOnly/>
            </div>
            <div className="col-span-12">
              <label className="block text-gray-700">Tanggal Kadaluarsa</label>
              <input type="date" name="tgl_kadaluarsa" className="w-full p-2 rounded-md border border-indigo-400 focus:outline-none focus:ring" />
            </div>
            <div className="col-span-12">
              <label className="block text-gray-700">Satuan</label>
              <input type="text" name="satuan" className="w-full p-2 rounded-md border border-indigo-400 focus:outline-none focus:ring bg-gray-50" value={selectedBarang.satuan} readOnly/>
            </div>
            <div className="col-span-12">
              <label className="block text-gray-700">Jumlah Barang Kadaluarsa</label>
              <input type="text" name="jumlah" className="w-full p-2 rounded-md border border-indigo-400 focus:outline-none focus:ring"/>
            </div>
            <div className="col-span-12 flex justify-end">
              <button type="submit" className="px-4 py-2 rounded-md bg-indigo-500 text-white focus:outline-none focus:ring">Submit</button>
            </div>
          </div>
        </form>
      </Modal>

      {/* <ModalSelectBarang 
        ref={modalSelectBarangRef}
        onSelectBarang={(id) => handleSelectBarang(id)}
        onCloseModal={(boolean) => setOpen(boolean)}
      /> */}
    </Fragment>
  )
})

export default modalBarangKadaluarsa