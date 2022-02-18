import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, SupervisedUserCircle } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userlist.users);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  // console.log(users)
  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "username",
      headerName: "Username",
      width: 200
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            {!params.row.isAdmin ? <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          :
          <SupervisedUserCircle/>
          }
          </>
        );
      },
    },
  ];
  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}
