import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector } from "react-redux";

export default function FeaturedInfo({ income }) {
  const perc = useSelector((state) => state.income.perc)
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
        <span style={{ fontSize: "20px", fontWeight: "500" }}>{income[0] ? "With " + income[0]?.totalCount + " Orders" : "No order recently"}</span>
      </div>
      <div className="featuredItem1">
        <span className="featuredTitle">Sales last month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₱ {income[1] ? income[1]?.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : "0.00"}</span>
        </div>
        <span style={{ fontSize: "20px", fontWeight: "500" }}>{income[1] ? "With " + income[1]?.totalCount + " Orders" : "No sales last month"}</span>
      </div>
    </div>
  );
}
