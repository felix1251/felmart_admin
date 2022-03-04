import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAdmin = useSelector((state) => state.user.currentUser?.isAdmin);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAdmin ? (
          <>
            <div className="container">
              <Sidebar />
              <Component {...props} />
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
