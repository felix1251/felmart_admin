import { CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password })
  };

  const loading = useSelector(state => state.user.isFetching)

  return (
    <form
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fbb034",
        backgroundImage: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)"
      }}
      onSubmit={handleClick}
    >
      <div style={{ backgroundColor: "#FFFFCC", padding: "50px 70px", borderRadius: "15px", border: "1px solid black", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ marginBottom: "30px" }}>Felmart Admin Login</h2>
        <input
          required
          style={{ borderRadius: "15px", border: "1px solid black", width: "100%", padding: 10, marginBottom: 20 }}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          style={{ borderRadius: "15px", border: "1px solid black", width: "100%", padding: 10, marginBottom: 20 }}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={{display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", backgroundColor: "black", color: "white", cursor: "pointer", borderRadius: "12px", border: "none", padding: 10, width: 100 }}>
          {loading ? <CircularProgress thickness={8} variant="indeterminate" size={19} /> :  "Login"} 
        </button>
      </div>
    </form>
  );
};

export default Login;
