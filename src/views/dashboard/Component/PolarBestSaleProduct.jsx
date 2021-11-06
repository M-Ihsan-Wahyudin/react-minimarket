import { useState } from "react"
import { useEffect } from "react"
import { PolarArea } from "react-chartjs-2";
import { useSelector } from "react-redux";

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

  const { data } = useSelector(state => state.laporan);

  const calculate = () => {
    let newLabels = [];
    let newData = [];
    for(let i = 0; i < data.bestSaleProduct.length; i++) {
      newLabels.push(data.bestSaleProduct[i].nama_barang);
      newData.push(parseInt(data.bestSaleProduct[i].total_barang));
    }
    setChartData({
      labels: newLabels,
      datasets: [{
        label: 'Produk Terlaris',
        data: newData,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    });
  }

  useEffect(() => {
    if(data.length !== 0 && chartData.labels.length === 0) {
      calculate();
    }
  })

  return (
    <PolarArea data={chartData} />
  )
}