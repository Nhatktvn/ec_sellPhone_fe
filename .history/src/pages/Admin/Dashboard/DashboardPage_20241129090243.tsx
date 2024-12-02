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
    { id: '#ORD002', customer: 'Jane Smith', date: '2024-01-19', amount: '$233.80', status: 'Pending' },
    { id: '#ORD003', customer: 'Robert Johnson', date: '2024-01-19', amount: '$876.20', status: 'Processing' },
    { id: '#ORD004', customer: 'Emily Brown', date: '2024-01-18', amount: '$154.30', status: 'Completed' },
    { id: '#ORD005', customer: 'Michael Wilson', date: '2024-01-18', amount: '$967.40', status: 'Completed' }
  ]

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales 2024',
        data: [30, 45, 35, 50, 40, 60],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: false
      }
    ]
  }

  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ]
      }
    ]
  }

  const monthlyOrders = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Orders',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }
    ]
  }

  const sortData = (key: any) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getSortedOrders = () => {
    if (!sortConfig.key) return recentOrders

    return [...recentOrders].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {statsCards.map((card) => (
          <div
            key={card.id}
            className='bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>{card.title}</p>
                <h3 className='text-2xl font-bold text-gray-800 mt-1'>{card.value}</h3>
                <span className='text-sm text-green-500'>{card.change}</span>
              </div>
              <div className='p-3 bg-blue-100 rounded-full text-blue-600'>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl font-semibold mb-4'>Sales Overview</h2>
          <Line data={salesData} options={{ responsive: true }} />
        </div>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl font-semibold mb-4'>Category Distribution</h2>
          <Pie data={categoryData} options={{ responsive: true }} />
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-lg mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Monthly Orders</h2>
        <Bar data={monthlyOrders} options={{ responsive: true }} />
      </div>

      {/* Recent Orders Table */}
      <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
        <h2 className='text-xl font-semibold p-6 bg-gray-50 border-b'>Recent Orders</h2>
        <div className='overflow-x-auto'>
          <table className='w-full' role='table'>
            <thead>
              <tr className='bg-gray-50'>
                <th
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => sortData('id')}
                >
                  Order ID
                </th>
                <th
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => sortData('customer')}
                >
                  Customer
                </th>
                <th
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => sortData('date')}
                >
                  Date
                </th>
                <th
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => sortData('amount')}
                >
                  Amount
                </th>
                <th
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                  onClick={() => sortData('status')}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {getSortedOrders().map((order) => (
                <tr key={order.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.customer}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.date}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.amount}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardComponent
