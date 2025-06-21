import React, { useEffect, useRef, useState } from "react";
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
  Chart,
  type ChartType,
  DoughnutController,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";        
import { Link } from "react-router-dom";
import {
  MoreHorizontal,
  Filter,
  ArrowUp,
  ArrowDown,
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
);

type SaleReportProps = {
  description: string;
  amount: string | number;
  percent: number;
  icon: React.ReactNode;
  color: 'indigo' | 'blue' | 'emerald' | 'rose';
};

type OrderLocationProps = {
  location: string;
  orders: number;
  color: string;
};

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  amount: number;
};

function AdminDashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">Welcome back, Admin</h2>
              <p className="text-sm md:text-base text-gray-600">Here's what's happening with your store today</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <SaleReport
                description="Total Sales"
                amount="34,456.00"
                percent={14}
                icon={<DollarSign size={20} className="md:size-[22px]" />}
                color="indigo"
              />
              <SaleReport
                description="Total Orders"
                amount={3456}
                percent={17}
                icon={<ShoppingCart size={20} className="md:size-[22px]" />}
                color="blue"
              />
              <SaleReport
                description="Total Revenue"
                amount="1,456.00"
                percent={14}
                icon={<TrendingUp size={20} className="md:size-[22px]" />}
                color="emerald"
              />
              <SaleReport
                description="Total Customers"
                amount="42"
                percent={-11}
                icon={<Users size={20} className="md:size-[22px]" />}
                color="rose"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Main Graph */}
              <div className="lg:col-span-4 bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-5 border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800">Revenue Overview</h3>
                  <select className="w-full sm:w-auto bg-gray-50 border border-gray-200 text-gray-700 py-1 px-3 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
                <div className="h-48 sm:h-56 md:h-64">
                  <Graph />
                </div>
              </div>

              {/* Sales Location */}
              <div className="lg:col-span-2 bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-5 border border-gray-100">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800">Sales By Location</h3>
                  <MoreHorizontal size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 md:size-[18px]" />
                </div>
                <div className="space-y-3 md:space-y-5">
                  {[
                    { city: "New York", orders: 187, color: "bg-indigo-500" },
                    { city: "Los Angeles", orders: 154, color: "bg-blue-500" },
                    { city: "Chicago", orders: 129, color: "bg-emerald-500" },
                    { city: "San Francisco", orders: 92, color: "bg-amber-500" }
                  ].map((location, index) => (
                    <OrderLocation
                      key={index}
                      location={location.city}
                      orders={location.orders}
                      color={location.color}
                    />
                  ))}
                </div>
              </div>

              {/* Pie Chart */}
              <div className="lg:col-span-1 bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-5 border border-gray-100">
                <div className="mb-3 md:mb-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 text-center">Sales Channels</h3>
                </div>
                <div className="h-40 sm:h-48">
                  <PieChart />
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Products Table */}
              <div className="lg:col-span-3 bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-100">
                <TopSellingProducts />
              </div>

              {/* Monthly Target */}
              <div className="lg:col-span-1">
                <MonthlyTarget />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const MonthlyTarget = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"doughnut", number[], unknown> | null>(null);
  const percentage = 75.34;
  const todayEarnings = 3267;
  const target = 25000;
  const revenue = 18000;
  const today = 1800;

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(num);
  };

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new ChartJS(ctx, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [percentage, 100 - percentage],
              backgroundColor: ['#6366F1', '#E5E7EB'],
              borderWidth: 0,
              borderRadius: 5,
              circumference: 360,
              cutout: '80%'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            rotation: -90,
            plugins: {
              tooltip: {
                enabled: false
              }
            },
            animation: {
              animateRotate: true,
              animateScale: false
            },
            elements: {
              arc: {
                roundedCornersFor: 0
              }
            }
          }
        });
      }
    }
    
    // Clean up chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [percentage]);

  return (
    <div className="p-4 md:p-5 bg-white shadow-sm rounded-lg md:rounded-xl border border-gray-100 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 md:mb-5">
        <h4 className="text-base md:text-lg font-semibold text-gray-800">Monthly Target</h4>
        <MoreHorizontal size={16} className="cursor-pointer text-gray-400 hover:text-gray-600 md:size-[18px]" />
      </div>

      {/* Progress Chart using Chart.js */}
      <div className="flex justify-center items-center mb-4 md:mb-5 relative">
        <div className="w-28 h-28 md:w-36 md:h-36 relative">
          <canvas ref={chartRef} width="144" height="144"></canvas>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-lg md:text-xl font-bold text-gray-800">{percentage.toFixed(2)}%</div>
            <div className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md mt-1 font-medium">
              +12%
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Text */}
      <p className="text-center text-sm md:text-base text-gray-600 mb-4 md:mb-6 px-1 md:px-2">
        You earned <span className="font-semibold text-gray-800">{formatCurrency(todayEarnings)}</span> today.
        <span className="block mt-1">It's higher than last month. Keep up your good work!</span>
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 md:pt-4">
        <div className="flex flex-col items-center">
          <span className="text-sm md:text-base font-bold text-gray-800">{formatCurrency(target)}</span>
          <span className="text-red-500 text-xs font-medium">↓ 8.3%</span>
          <span className="text-gray-500 text-xs mt-1">Target</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm md:text-base font-bold text-gray-800">{formatCurrency(revenue)}</span>
          <span className="text-green-500 text-xs font-medium">↑ 11.2%</span>
          <span className="text-gray-500 text-xs mt-1">Revenue</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm md:text-base font-bold text-gray-800">{formatCurrency(today)}</span>
          <span className="text-green-500 text-xs font-medium">↑ 9.7%</span>
          <span className="text-gray-500 text-xs mt-1">Today</span>
        </div>
      </div>
    </div>
  );
};

const TopSellingProducts = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Casual Shirt",
      image: "/shirt.png",
      price: 76.89,
      category: "Men's Clothing",
      quantity: 128,
      amount: 6647.15,
    },
    {
      id: 2,
      name: "Graphic T-Shirt",
      image: "/tshirt.png",
      price: 79.8,
      category: "Women's Clothing",
      quantity: 89,
      amount: 6647.15,
    },
    {
      id: 3,
      name: "Slim Fit Pants",
      image: "/pant.png",
      price: 86.65,
      category: "Kid's Clothing",
      quantity: 74,
      amount: 6647.15,
    },
    {
      id: 4,
      name: "Wool Sweater",
      image: "/sweater.png",
      price: 56.07,
      category: "Men's Clothing",
      quantity: 69,
      amount: 6647.15,
    },
    {
      id: 5,
      name: "Light Jacket",
      image: "/light-jacket.png",
      price: 36.0,
      category: "Women's Clothing",
      quantity: 65,
      amount: 6647.15,
    },
  ];

  return (
    <div className="p-4 md:p-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
        <h4 className="text-base md:text-lg font-semibold text-gray-800">
          Top Selling Products
        </h4>
        <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
          <button className="px-2 py-1 md:px-3 md:py-1.5 flex items-center gap-1 text-xs md:text-sm bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-gray-700 transition-colors w-full sm:w-auto justify-center">
            <Filter size={12} className="md:size-[14px]" /> Filter
          </button>
          <button className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg border border-indigo-100 transition-colors w-full sm:w-auto">
            See All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-2 md:py-4 md:px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
              </th>
              <th className="py-3 px-2 md:py-4 md:px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="py-3 px-2 md:py-4 md:px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="py-3 px-2 md:py-4 md:px-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
              <th className="py-3 px-2 md:py-4 md:px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="py-3 px-2 md:py-4 md:px-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">Amount</th>
              <th className="py-3 px-2 md:py-4 md:px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-2 md:py-3 md:px-3">
                  <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                </td>
                <td className="py-2 px-2 md:py-3 md:px-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-6 h-6 md:w-8 md:h-8 object-contain"
                      />
                    </div>
                    <span className="font-medium text-gray-800 text-sm md:text-base">{product.name}</span>
                  </div>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-3 font-medium text-gray-700 text-sm md:text-base">${product.price.toFixed(2)}</td>
                <td className="py-2 px-2 md:py-3 md:px-3 text-gray-600 text-sm hidden sm:table-cell">{product.category}</td>
                <td className="py-2 px-2 md:py-3 md:px-3">
                  <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium">
                    {product.quantity}
                  </span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-3 font-medium text-gray-700 text-sm hidden xs:table-cell">${product.amount.toLocaleString()}</td>
                <td className="py-2 px-2 md:py-3 md:px-3">
                  <button className="p-0.5 md:p-1 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal size={16} className="text-gray-500 md:size-[18px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PieChart = () => {
  const data = {
    labels: ["Direct", "Affiliate", "Sponsored", "E-mail"],
    datasets: [
      {
        data: [300.56, 135.18, 154.02, 48.96],
        backgroundColor: ["#6366F1", "#3B82F6", "#8B5CF6", "#10B981"],
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
          },
        },
        padding: 10,
        backgroundColor: "rgba(17, 24, 39, 0.9)",
      },
      legend: {
        display: false,
      },
    },
    cutout: "60%",
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
      <div className="mt-1 md:mt-2 space-y-1 md:space-y-1.5">
        {data.labels.map((label, index) => (
          <div key={index} className="flex justify-between text-xs px-1">
            <div className="flex items-center">
              <span
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-1 md:mr-2"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              ></span>
              <span className="text-gray-600">{label}</span>
            </div>
            <span className="font-medium text-gray-800">
              ${data.datasets[0].data[index].toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Graph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "This Year",
        data: [5000, 10000, 7000, 15000, 13000, 17000],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#6366F1",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 3,
      },
      {
        label: "Last Year",
        data: [1000, 20000, 4000, 7000, 8000, 12000],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#3B82F6",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#6B7280",
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: { 
          display: false,
          drawBorder: false,
        },
        ticks: { 
          color: "#9CA3AF",
          font: {
            size: 11,
          }
        },
      },
      y: {
        grid: { 
          color: "#F3F4F6",
          drawBorder: false,
        },
        ticks: { 
          color: "#9CA3AF",
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

const OrderLocation: React.FC<OrderLocationProps> = ({ location, orders, color }) => {
  const percentage = Math.min(Math.floor(orders / 2), 100);

  return (
    <div>
      <div className="flex justify-between mb-1 md:mb-1.5">
        <div className="text-gray-700 font-medium text-sm md:text-base">{location}</div>
        <div className="text-gray-900 font-semibold text-sm md:text-base">{orders.toLocaleString()}</div>
      </div>
      <div className="h-1 md:h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const SaleReport: React.FC<SaleReportProps> = ({ description, amount, percent, icon, color }) => {
  const isPositive = percent >= 0;
  const amountFormatted = typeof amount === 'number' ? amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : amount;
  
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  };
  
  const iconColorClass = colorMap[color] || "bg-indigo-50 text-indigo-600";
  
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="space-y-2 md:space-y-3">
          <div className="text-gray-500 font-medium text-sm md:text-base">{description}</div>
          <div className="text-xl md:text-2xl font-bold text-gray-900">${amountFormatted}</div>
          <div
            className={`flex items-center gap-1 text-xs md:text-sm font-medium ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isPositive ? <ArrowUp size={12} className="md:size-[14px]" /> : <ArrowDown size={12} className="md:size-[14px]" />}
            <span>{Math.abs(percent)}% vs last month</span>
          </div>
        </div>
        <div className={`p-2 md:p-3 rounded-lg ${iconColorClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;