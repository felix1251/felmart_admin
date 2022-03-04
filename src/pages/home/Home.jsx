import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useCallback, useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Home({ socket }) {
  const [orderStats, setOrderStats] = useState([]);
  const [income, setIncome] = useState([])

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const fetchData = useCallback(async() => {
    const res = await userRequest.get("/orders/income");
    const list = res.data.sort((a, b) => {
      return a._id - b._id
    })
    list.map((item) =>
      setOrderStats((prev) => [
        ...prev,
        { name: MONTHS[item._id - 1], "sales": item.total },
      ])
    );
    setIncome(res.data)
  }, [MONTHS])

  useEffect(() => {
    const getStats = async () => {
      try {
        fetchData()
      } catch { }
    };
    getStats();
  }, [fetchData]);

  useEffect(() => {
    socket?.on("getNotification", () => {
      fetchData()
    });
  }, [socket, fetchData]);

  return (
    <div className="home" >
      <FeaturedInfo income={income} />
      <Chart
        data={orderStats}
        title="Sales Analytics"
        grid
        dataKey="sales"
      />
      <div className="homeWidgets">
        <WidgetLg />
      </div>
    </div>
  );
}
