import React from "react";
import "./topbar.css";
import { AccountCircle, SupervisorAccount, Notifications } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Button, Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/userRedux";

export default function Topbar({ notif, user}) {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    localStorage.clear()
    dispatch(logout())
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
          <div className="notifications">
            {notif.map((n, key) => (
              <div key={key} className="notification">{n.senderName} has ordered</div>
            ))}
          </div>
          <div className="topbarIconContainer">
            <Badge badgeContent={notif.length} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }} color="primary">
              <Notifications color="action" />
            </Badge>
          </div>
          <div className="topbarIconContainer">
            <AccountCircle />
          </div>
          <div className="username">
            {user.username} ({user.email})
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
