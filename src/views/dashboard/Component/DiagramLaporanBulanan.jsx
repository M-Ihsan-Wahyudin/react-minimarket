import React, { Component } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'

class DiagramLaporanBulanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [{
          label: 'Laporan Bulanan',
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
      },
    }
  }

  componentDidMount() {  
    let token = localStorage.getItem('jwt');
    axios({
      method: 'GET',
      baseURL: 'http://127.0.0.1:8000/api/report/sale/monthly',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      let date = [];
      let chartData = {...this.state.chartData};
      for(let item of res.data) {
        chartData.datasets[0].data.push(item.total)
        date.push(item.tgl_faktur.substr(8,10))
      }
      chartData.labels = date;
      this.setState({chartData: chartData})
    })
  }

  render() {
    return (
      <Bar data={this.state.chartData} />
    )
  }
}

export default DiagramLaporanBulanan