import React from "react";
import "./topbar.css";
import { AccountCircle, SupervisorAccount } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/userRedux";
import { clearOnLogout } from "../../redux/productRedux";


export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    localStorage.clear()
    dispatch(logout())
    dispatch(clearOnLogout())
    history.push("/login")
    window.location.reload()
  }

  // console.log(user)
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <SupervisorAccount fontSize="large" />
          <span className="logo">Felmart PH Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <AccountCircle />
          </div><div className="username">
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
