import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { PolarArea } from "react-chartjs-2";

export default function PolarBestSaleProduct() {
  const [chartData, setChartData] = useState(
    {
      labels: [],
      datasets: [{
        label: 'Produk Terlaris',
        data: [],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    }
  );

  const [dataProduk] = useState();
  useEffect(() => {
    if(typeof dataProduk === 'undefined') {
      const token = localStorage.getItem('jwt');
      axios({
        method: 'GET',
        baseURL: 'http://127.0.0.1:8000/api/report/sale/bestsaleproduct',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        let labels = [];
        let data = [];
        for(let item of res.data) {
          labels.push(item.nama_barang);
          data.push(parseInt(item.total_barang));
        }
        setChartData(
          {
            labels: labels,
            datasets: [{
              label: 'Produk Terlaris',
              data: data,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)'
              ]
            }]
          }
        );
      })
    }
  })
  return (
    <PolarArea data={chartData} />
  )
}