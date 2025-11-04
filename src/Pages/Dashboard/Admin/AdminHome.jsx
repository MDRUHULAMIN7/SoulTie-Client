import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Heading from "../Sidebar/Heading";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  FaDollarSign,
  FaUsers,
  FaMale,
  FaFemale,
  FaCrown,
  FaChartBar,
  FaChartPie,
} from "react-icons/fa";
import LoadingSpiner from "../../../Components/Shareds/LoadingSpiner";
import { MdDangerous } from "react-icons/md";

const PIE_CHART_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
];
const BAR_CHART_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#8dd1e1",
];

// Custom shape for bar chart
const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// Custom label for pie chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{`${label}`}</p>
        <p className="text-rose-600">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AdminHome = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  const {
    data: stats = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-stats"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get("/admin-info");

      return res?.data?.data;
    }
  });

  // Stats cards data
  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats?.revenue || 0}`,
      icon: FaDollarSign,
      color: "bg-gradient-to-r from-green-400 to-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Total Biodata",
      value: stats?.biodata || 0,
      icon: FaUsers,
      color: "bg-gradient-to-r from-blue-400 to-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Male Biodata",
      value: stats?.maleData || 0,
      icon: FaMale,
      color: "bg-gradient-to-r from-indigo-400 to-indigo-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      title: "Female Biodata",
      value: stats?.femaleData || 0,
      icon: FaFemale,
      color: "bg-gradient-to-r from-pink-400 to-pink-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
    {
      title: "Premium Users",
      value: stats?.premiumData || 0,
      icon: FaCrown,
      color: "bg-gradient-to-r from-yellow-400 to-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
  ];

  // Chart data preparation
  const chartData = [
    {
      name: "Revenue",
      value: stats?.revenue || 0,
      display: `$${stats?.revenue || 0}`,
    },
    {
      name: "Biodata",
      value: stats?.biodata || 0,
      display: stats?.biodata || 0,
    },
    {
      name: "Male",
      value: stats?.maleData || 0,
      display: stats?.maleData || 0,
    },
    {
      name: "Female",
      value: stats?.femaleData || 0,
      display: stats?.femaleData || 0,
    },
    {
      name: "Premium",
      value: stats?.premiumData || 0,
      display: stats?.premiumData || 0,
    },
  ];

  if (isLoading) {
    return <LoadingSpiner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">
            <MdDangerous />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600">
            Failed to load admin statistics. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Heading
        heading="Admin Dashboard"
        subheading="Welcome back! Here's your platform overview"
      />
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <card.icon className={`text-2xl ${card.textColor}`} />
              </div>
            </div>
            <div className={`mt-4 h-1 rounded-full ${card.color}`}></div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaChartBar className="text-rose-500" />
              Platform Statistics
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Overview
            </span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  tick={{ fill: "#6b7280" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Count/Value"
                  shape={<TriangleBar />}
                  label={{ position: "top", fill: "#374151", fontSize: 12 }}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={BAR_CHART_COLORS[index % BAR_CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaChartPie className="text-rose-500" />
              Data Distribution
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Percentage
            </span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ right: -20 }}
                  formatter={(value, entry) => (
                    <span style={{ color: "#374151", fontSize: "12px" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-rose-500 to-rose-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Platform Performance</h3>
            <p className="text-rose-100">
              Total platform revenue:{" "}
              <span className="font-bold">${stats?.revenue || 0}</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats?.biodata || 0}</div>
                <div className="text-rose-100">Total Profiles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {stats?.premiumData || 0}
                </div>
                <div className="text-rose-100">Premium Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
