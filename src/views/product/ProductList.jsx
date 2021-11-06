import React from "react";
import { connect } from "react-redux";
import axios from "axios";

// Component
import Table from "../../component/table/table";
import { addProduct } from "../../store/features/product/productSlice";



class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [
        'No', 'Nama Produk', 'Harga', 'Kategori', 'satuan', 'stok'
      ]
    }
  }

  componentDidMount() {
    let product = this.props.product.data;
    if(product.length === 0) {
      axios({
        method: 'GET',
        baseURL: 'https://backend-minimarket.herokuapp.com/api/product',
        headers: {
          'Authorization': 'Bearer 3|2mbhNYnsgw6ucKqZ4MiobU9YZh6UwH05xPVjdAPF'
        }
      }).then(res => {
        console.info(res);
        this.props.addProduct(res.data);
      }).catch(error => {
        console.info(error)
      })
    }
  }

  render() {
    return (
      <main className="main-content main-bg">
        <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
          <div className="col-span-12 bg-white shadow rounded-md p-5">
            <Table title={this.state.title} srOnly={true}> 
              {
                this.props.product.data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama_barang}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp. {item.harga_jual}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.produk.nama_produk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.satuan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stok}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">Edit</td>
                    </tr>
                  )
                })
              }
            </Table>
          </div>
        </div>
      </main>
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
    addProduct: (value) => dispatch(addProduct(value))
  }
}

export default connect(mapStateToProps, mapDispactToProps)(ProductList);