import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import OrderList from "./pages/orderList/orderList";
import Order from "./pages/order/order";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProtectedRoute from "./protectedRoutes";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);
  return (
    <Router>
      <ToastContainer/>
      <BrowserRouter>
        {admin && <Topbar socket={socket} />}
        <Switch>
          {!admin && (
            <>
              <Route exact path="/login">
                <Login />
              </Route>
              <Redirect to="/login" />
            </>
          )}
          <ProtectedRoute path="/" exact socket={socket} component={Home} />
          <ProtectedRoute path="/users" component={UserList} />
          <ProtectedRoute path="/user/:userId" component={User} />
          <ProtectedRoute path="/newUser" component={NewUser} />
          <ProtectedRoute path="/products" component={ProductList} />
          <ProtectedRoute path="/product/:productId" component={Product} />
          <ProtectedRoute path="/newproduct" component={NewProduct} />
          <ProtectedRoute path="/orders" component={OrderList} />
          <ProtectedRoute path="/order/:orderId" component={Order} />
        </Switch>
      </BrowserRouter>
    </Router>
  );
}

export default App;
