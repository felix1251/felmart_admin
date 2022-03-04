import React, { useEffect, useState } from "react";
import "./topbar.css";
import { AccountCircle, SupervisorAccount, NotificationsActiveTwoTone } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Button, Badge } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/userRedux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { bellClicked, saveNotification, viewNotification } from "../../redux/notificationRedux";

import { getOrders } from "../../redux/apiCalls";

export default function Topbar({ socket }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()
  const history = useHistory()
  const username = useSelector((state) => state.user.currentUser?.username);
  const notification = useSelector((state) => state.notification.data);
  const notificationCounter = useSelector((state) => state.notification.counter);

  useEffect(() => {
    socket?.emit("newUser", username);
  }, [socket, username]);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      getOrders(dispatch);
      dispatch(saveNotification({total: data.amount, username: data.userId, _id: data._id, items: data.products.length}))
    });
  }, [socket, dispatch]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    dispatch(bellClicked())
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout())
    localStorage.clear()
    history.push("/login")
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">

        <div className="topLeft">
          <SupervisorAccount fontSize="large" />
          <span className="logo">Felmart PH Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Badge badgeContent={notificationCounter} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }} color="error">
              <NotificationsActiveTwoTone fontSize="large" style={{ color: "black" }} onClick={handleClick} />
            </Badge>
          </div>
          <div>
            <Menu
              id="notification"
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              anchorEl={anchorEl}
              keepMounted
              PaperProps={{
                style: {
                  width: 420,
                  marginTop: 10,
                },
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
            >
              <div>
                <h4 style={{ marginLeft: "15px" }}>Notifications during online </h4>
                {notification?.length !== 0
                  ? notification?.map((n, key) => (
                    <MenuItem key={key} component={Link} to={`/order/${n._id}`} onClick={() => dispatch(viewNotification(n._id))}> ₱ {n.total},  {n.username} has ordered {n.items > 1 ? n.items + " items" : "1 item"}</MenuItem>
                  ))
                  : <MenuItem disabled>No notifications</MenuItem>}
              </div>

            </Menu>
          </div>
          <div className="topbarIconContainer">
            <AccountCircle fontSize="large" style={{ color: "black" }} />
          </div>
          <div className="username">
            {username}
          </div>
          <Button
            onClick={handleLogout}
            size="small"
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
