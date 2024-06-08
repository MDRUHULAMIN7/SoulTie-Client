import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import img1 from "../../../images/download.png";
import img2 from "../../../images/images.png";
import img3 from "../../../images/png.png";
import img4 from "../../../images/man.png";
import img5 from "../../../images/i.png";
import { PieChart, Pie, Legend, Cell,   } from "recharts";
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const COLORS = ["#0088FE", "#00C49F", "#FF8042", "red", "pink"];

const AdminHome = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-info"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get("/admin-info");
      return res.data;
    },
  });
  console.log(stats);
  const chart = [
    {
      name: "TotalRevenue",
      value: stats.revenue,
    },
    {
      name: "AllBiodata",
      value: stats.biodata,
    },
    {
      name: "Male",
      value: stats.maleData,
    },
    {
      name: "Female",
      value: stats.femaleData,
    },
    {
      name: "Premium",
      value: stats.premiumData,
    },
  ];
  console.log(chart);

  // chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
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
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

//   chart

const getPath = (x, y, width, height) => {
	return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
	${x + width / 2}, ${y}
	C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
	Z`;};  const TriangleBar = (props) => {
	const { fill, x, y, width, height } = props;
	return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;};

  const pieChartdata = chart.map((datas) => {
    return { name: datas.name, value: datas.value };
  });
  const barChart = [stats.revenue,stats.biodata, stats.maleData,stats.femaleData, stats.premiumData,]
console.log(chart);
console.log(barChart);
  return (
    <div>
      <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
        <div className="container grid grid-cols-1 gap-2 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4j xl:grid-cols-5 ">
          <div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
              <img className="h-16" src={img1} alt="" />
            </div>
            <div className="flex flex-col justify-center ">
              <p className="text-3xl font-semibold leading-none">
                {stats.revenue} $
              </p>
              <p className="capitalize">TotalRevenue</p>
            </div>
          </div>
          <div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
              <img className="h-16" src={img2} alt="" />
            </div>
            <div className="flex flex-col justify-center ">
              <p className="text-3xl font-semibold leading-none">
                {stats.biodata}
              </p>
              <p className="capitalize">TotalBiodata</p>
            </div>
          </div>
          <div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
              <img className="h-16" src={img4} alt="" />
            </div>
            <div className="flex flex-col justify-center ">
              <p className="text-3xl font-semibold leading-none">
                {stats.maleData}{" "}
              </p>
              <p className="capitalize">MaleBiodata</p>
            </div>
          </div>
          <div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
              <img className="h-16" src={img3} alt="" />
            </div>
            <div className="flex flex-col justify-center ">
              <p className="text-3xl font-semibold leading-none">
                {stats.femaleData}{" "}
              </p>
              <p className="capitalize">Female Biodata</p>
            </div>
          </div>
          <div className="flex p-2 rounded-lg text-rose-400 w-fit dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
              <img className="h-16" src={img5} alt="" />
            </div>
            <div className="flex flex-col justify-center ">
              <p className="text-3xl font-semibold leading-none">
                {stats.premiumData}
              </p>
              <p className="capitalize">Premium Biodata</p>
            </div>
          </div>
        </div>
      </section>

      <div className="lg:flex  items-center">
        <div className="w-2/3">
          <BarChart className="w-full"
            width={550}
            height={300}
            data={chart}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="value"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
		<div className="1/3">
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartdata}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartdata.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      </div>
      </div>

     
    </div>
  );
};

export default AdminHome;
