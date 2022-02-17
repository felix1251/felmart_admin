import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [orderPerc, setOrderPerc] = useState(0)

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
        setOrderPerc((res.data[1].totalCount * 100 / res.data[0].totalCount - 100))
      } catch { }
    };
    getIncome();
  }, []);
  // console.log(income)
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Sales this month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₱ {income[0]?.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
          <span className="featuredMoneyRate">
            {Math.floor(perc)} %
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month( ₱ {income[1] ? income[1]?.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : 0} )</span>
      </div>
      {/* <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₱ {income[0]?.total}</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">This Month</span>
      </div> */}
      <div className="featuredItem1">
        <span className="featuredTitle">Total orders this month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[0] ? income[0]?.totalCount : 0}</span>
          {/* <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span> */}
          <span className="featuredMoneyRate">
           {Math.floor(orderPerc)} %
            {orderPerc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month( {income[1] ? income[0]?.totalCount : 0} )</span>
      </div>
    </div>
  );
}
