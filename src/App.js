import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import OrderList from "./pages/orderList/orderList";
import Order from "./pages/order/order";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getOrders } from "./redux/apiCalls";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [notif, setNotif] = useState([]);
  const [socket, setSocket] = useState(null);
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user?.username);
  }, [socket, user?.username]);

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotif((prev) => [...prev, data]);
      getOrders(dispatch);
    });
  }, [socket, dispatch]);
  
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {admin && (
          <>
            <Topbar notif={notif} user={user} />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/orders">
                <OrderList />
              </Route>
              <Route path="/order/:orderId">
                <Order />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
