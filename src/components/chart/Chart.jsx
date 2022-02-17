import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {
  // console.log(data)
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <YAxis />
          <XAxis dataKey={"name"} stroke="#000000" />
          <Line type="monotone" dataKey={dataKey.sale} stroke="#8884d8"/>
          <Tooltip />
          {grid && <CartesianGrid stroke="#6f6f6f" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
