import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import {
  AccountCircle,
  LocationSearching,
  PhoneAndroid,
  AttachMoney,
  Payment,
  AccessTime,
  Timelapse
} from "@material-ui/icons";
import "./order.css";
import moment from "moment"

const Order = () => {
  const location = useLocation()
  const orderId = location.pathname.split("/")[2];
  
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Order Details</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">Oder Id: {order?._id}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Order Details</span>
            <div className="userShowInfo">
              <AccountCircle className="userShowIcon" />
              <span className="userShowInfoTitle"><b>Person:</b> {order?.userId}</span>
            </div>
            <div className="userShowInfo">
              <AttachMoney className="userShowIcon" />
              <span className="userShowInfoTitle"><b>Amount: </b> ₱ {order?.amount}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle"><b>Mobile No:</b> {order?.mobileNo}</span>
            </div>
            <div className="userShowInfo">
              <Payment className="userShowIcon" />
              <span className="userShowInfoTitle"><b>Payment Type:</b> {order?.paymentType}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle"><b>Address:</b> {order?.address}</span>
            </div>
            <div className="userShowInfo">
            <AccessTime className="userShowIcon" />
              <span className="userShowInfoTitle"><b>Ordered At:</b> {moment(order?.createdAt).format('llll')}</span>
            </div>
            <div className="userShowInfo">
            <Timelapse className="userShowIcon" />
              <span className="userShowInfoTitle"><b>Status:</b> {order?.status}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Actions</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tracking Number:</label>
                <input
                  type="text"
                  placeholder="Not set"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Courier</label>
                <input
                  type="text"
                  placeholder="Not Set"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Messasge (Optional)</label>
                <input
                  type="text"
                  placeholder="Not Set"
                  className="userUpdateInput"
                />
              </div>
              <div style={{marginTop: "40px"}} className="userUpdateItem">
                <button className="userUpdateButton">On Delivery</button>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Order