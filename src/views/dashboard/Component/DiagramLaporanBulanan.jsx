import React, { useEffect } from 'react'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

// class DiagramLaporanBulanan extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chartData: ,
//     }
//   }

//   componentDidMount() {  
//     let token = localStorage.getItem('jwt');
//     axios({
//       method: 'GET',
//       baseURL: 'https://backend-minimarket.herokuapp.com/api/report/sale/monthly',
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(res => {
//       let date = [];
//       let chartData = {...this.state.chartData};
//       for(let item of res.data) {
//         chartData.datasets[0].data.push(item.total)
//         date.push(item.tgl_faktur.substr(8,10))
//       }
//       chartData.labels = date;
//       this.setState({chartData: chartData})
//     })
//   }

//   render() {
//     return (
//       <Bar data={this.state.chartData} />
//     )
//   }
// }

// export default DiagramLaporanBulanan

export default function DiagramLaporanBulanan() {

  const [ chartData, setChartData ] = useState({
    labels: [],
    datasets: [{
      label: 'Laporan Bulan ini',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(201, 203, 207, 0.5)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1,
      animations: {
        y: {
          duration: 2000,
          delay: 500
        }
      },
    }]
  })
  const { data } = useSelector(state => state.laporan)
  
  const calculate = () => {
    let date = [];
    let newObj = {...chartData};
    for(let item of data.saleMonthly) {
      newObj.datasets[0].data.push(item.total)
      date.push(item.tgl_faktur.substr(8,10))
    }
    newObj.labels = date;
    setChartData(newObj)
  }

  useEffect(() => {
    if(data.length !== 0 && chartData.labels.length === 0) {
      calculate();
    }
  })

  return (
    <Bar data={chartData}/>
  )
}