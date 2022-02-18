import { useEffect } from "react";
import "./widgetLg.css";
import { format } from "timeago.js"
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/apiCalls";

export default function WidgetLg() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders).slice().reverse()
  const limit = orders.slice(0,5)

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);;

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Orders</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Payment Type</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {limit.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">₱{order.amount}</td>
              <td className="widgetLgAmount">{order.paymentType}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
