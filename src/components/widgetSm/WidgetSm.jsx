import "./widgetSm.css";
import { AccountCircle, SupervisedUserCircle, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch { }
    };
    getUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            {user.isAdmin ? <SupervisedUserCircle fontSize="large" /> : <AccountCircle fontSize="large" />}
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <Button component={Link} to={`/user/${user._id}`} variant="contained" size="small">
              <Visibility className="widgetSmIcon" />
              View
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
