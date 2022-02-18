import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import { addUserFailure, addUserStart, addUserSuccess, deleteUserFailure, deleteUserSuccess, getUserFailure, getUserStart, getUserSuccess, updateUserFailure, updateUserStart, updateUseruccess } from "./userlistRedux";
import { addOrderFailure, addOrderStart, addOrderSuccess, deleteOrderFailure, deleteOrderStart, deleteOrderSuccess, getOrderFailure, getOrderStart, getOrderSuccess, updateOrderFailure, updateOrderStart, updateOrderSuccess } from "./orderRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    window.location = "/"
  } catch (err) {
    dispatch(loginFailure());
  }
};

//GET ALL PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
//DELETE PRODUCT
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};
//UPDATE PRODUCT
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
//ADD PRODUCT
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
//-------------------------------------------------------------------
//GET ALL USERS
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
//DELETE USER
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
//UPDATE USER
export const updateUser = async (id, order, dispatch) => {
  dispatch(updateUserStart());
  try {
    await userRequest.put(`/users/${id}`, order);
    dispatch(updateUseruccess({ id, order }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
//ADD USER
export const addUser = async (order, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/users`, order);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};
//-------------------------------------------------------------------
//GET ALL ORDERS
export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
//DELETE ORDER
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};
//UPDATE ORDER
export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    await userRequest.put(`/orders/${id}`, order);
    dispatch(updateOrderSuccess({ id, order }));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};
//ADD ORDER
export const addOrder = async (order, dispatch) => {
  dispatch(addOrderStart());
  try {
    const res = await publicRequest.post(`/orders`, order);
    dispatch(addOrderSuccess(res.data));
  } catch (err) {
    dispatch(addOrderFailure());
  }
};