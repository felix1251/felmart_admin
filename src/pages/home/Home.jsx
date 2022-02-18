import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
// import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
// import { useSelector } from "react-redux";

export default function Home() {
  const [orderStats, setOrderStats] = useState([]);
  

  // const error = useSelector(state => state.user.error)
  // console.log(error)

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

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        res.data.map((item) =>
          setOrderStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Sales ( ₱ )": item.total },
          ])
        );
      } catch { }
    };
    getStats();
  }, [MONTHS]);


  return (
    <div className="home" >
      <FeaturedInfo />
      <Chart
        data={orderStats}
        title="Sales Analytics"
        grid
        dataKey={{ sale: "Sales ( ₱ )", order: "Orders" }}
      />
      <div className="homeWidgets">
        <WidgetLg />
      </div>
    </div>
  );
}
