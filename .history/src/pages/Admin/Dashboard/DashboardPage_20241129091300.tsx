import React, { useState } from 'react'
import { FiShoppingBag, FiDollarSign, FiUsers, FiBox } from 'react-icons/fi'
import { Line, Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement)

const DashboardComponent = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

  const statsCards = [
    { id: 1, title: 'Total Sales', value: '$124,563', icon: <FiDollarSign className='w-6 h-6' />, change: '+12.5%' },
    { id: 2, title: 'Total Orders', value: '1,243', icon: <FiShoppingBag className='w-6 h-6' />, change: '+8.2%' },
    { id: 3, title: 'Total Customers', value: '45,254', icon: <FiUsers className='w-6 h-6' />, change: '+5.7%' },
    { id: 4, title: 'Total Products', value: '856', icon: <FiBox className='w-6 h-6' />, change: '+3.4%' }
  ]

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', date: '2024-01-20', amount: '$542.50', status: 'Completed' },
    { id: '#ORD002', customer: 'Jane Smith', date: '2024-01-19', amount: '$233.99', status: 'Pending' },
    { id: '#ORD003', customer: 'Alice Johnson', date: '2024-01-18', amount: '$150.00', status: 'Completed' },
    { id: '#ORD004', customer: 'Bob Brown', date: '2024-01-17', amount: '$99.99', status: 'Shipped' }
  ]

  // Data for charts
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales Over Time',
        data: [130, 170, 200],
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: true
      }
    ]
  }

  const pieData = {
    labels: ['Completed', 'Pending', 'Shipped'],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3']
      }
    ]
  }

  const barData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Orders',
        data: [400, 500, 600, 700],
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1
      }
    ]
  }

  return (
    <div className='dashboard'>
      <div className='stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {statsCards.map((card) => (
          <div key={card.id} className='card bg-white p-6 rounded-lg shadow'>
            <div className='card-header flex items-center'>
              {card.icon}
              <h3 className='ml-4 text-xl font-semibold'>{card.title}</h3>
            </div>
            <div className='card-body'>
              <p className='text-2xl font-bold'>{card.value}</p>
              <p className='text-sm text-green-500'>{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='charts mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='chart'>
          <h3 className='text-lg font-semibold'>Sales Over Time</h3>
          <Line data={lineData} />
        </div>

        <div className='chart'>
          <h3 className='text-lg font-semibold'>Order Status</h3>
          <Pie data={pieData} />
        </div>

        <div className='chart'>
          <h3 className='text-lg font-semibold'>Quarterly Orders</h3>
          <Bar data={barData} />
        </div>
      </div>

      <div className='recent-orders mt-6'>
        <h3 className='text-lg font-semibold'>Recent Orders</h3>
        <table className='min-w-full'>
          <thead>
            <tr>
              <th className='py-2 px-4'>Order ID</th>
              <th className='py-2 px-4'>Customer</th>
              <th className='py-2 px-4'>Date</th>
              <th className='py-2 px-4'>Amount</th>
              <th className='py-2 px-4'>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className='py-2 px-4'>{order.id}</td>
                <td className='py-2 px-4'>{order.customer}</td>
                <td className='py-2 px-4'>{order.date}</td>
                <td className='py-2 px-4'>{order.amount}</td>
                <td className={`py-2 px-4 ${order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardComponent
