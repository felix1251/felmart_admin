import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCalls";
import moment from "moment"

export default function OrderList() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    console.log(orders)
    useEffect(() => {
        getOrders(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteOrder(id, dispatch);
    };

    const columns = [
        { field: "userId", headerName: "Person", width: 230 },
        {
            field: "createdAt",
            headerName: "Date of order",
            width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        {moment(params.row.createdAt).format("llll") }
                    </div>
                );
            },
        },
        {
            field: "amount",
            headerName: "Amount",
            width: 125,
            renderCell: (params) => {
                return (
                    <div>
                        ₱ {params.row.amount}
                    </div>
                );
            },
        },
        {
            field: "address",
            headerName: "Address",
            width: 350,

        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/order/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={orders}
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
