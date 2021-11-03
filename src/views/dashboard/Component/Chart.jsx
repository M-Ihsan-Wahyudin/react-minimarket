import React, { Component } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [1,2,3,4,5,6,7],
        datasets: [
          {
            label: 'Data Penjualan',
            data: [],
            fill: false,
            borderColor: 'rgb(99, 102, 241)',
            tension: 0.3,
            animations: {
              y: {
                duration: 2000,
                delay: 500
              }
            },
          },
          {
            label: 'My First Dataset',
            data: [21343, 39124, 60000, 71344, 26343, 35333, 20000],
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.3,
            animations: {
              y: {
                duration: 2000,
                delay: 500
              }
            },
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Ihsan Chart'
          },
        },
        interaction: {
          intersect: true,
        },
      },
    }
  }

  componentDidMount() {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const amountDayInThisMonth = this.daysInMonth(currentMonth, currentYear);
    console.info(amountDayInThisMonth);
  
    
    let token = localStorage.getItem('jwt');
    axios({
      method: 'GET',
      baseURL: 'http://127.0.0.1:8000/api/report/sale/monthly',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      // console.info(res)
      let total = [];
      let date = [];
      for(let item of res.data) {
        total.push(item.total)
        date.push(item.tgl_faktur.substr(8,10))
      }
      // for(let i = 1; i <= amountDayInThisMonth; i++) {
      //   date.push(i)
      //   if(res.data[i]) {
      //     total.push(res.data[i].total)
      //   } else {
      //     total.push(0)
      //   }
      // }
      let obj = this.state.chartData.datasets;
      obj[0].data = total
      this.setState({
        chartData: {
          labels: date,
          datasets: obj
        }
      })
      // console.info(this.state.chartData)
    })
  }

  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  render() {
    return (
      <Line data={this.state.chartData} options={this.state.options} />
    )
  }
}

export default Chart