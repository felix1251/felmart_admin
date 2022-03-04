import { createSlice } from "@reduxjs/toolkit";

export const createProduct = createSlice({
  name: "create",
  initialState: {
    title: "",
    price: 0,
    cat: [],
    inStock: true,
    color: [],
    size: [],
    desc: "",
    img: [],
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setCat: (state, action) => {
      state.cat = action.payload;
    },
    setInstock: (state, action) => {
      state.inStock = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setDesc: (state, action) => {
      state.desc = action.payload;
    },
    setImg: (state, action) => {
      state.img = action.payload;
    },
    createProduct: (state) => {
      state.title = "";
      state.price = 0;
      state.cat = [];
      state.inStock = true;
      state.color = [];
      state.size = [];
      state.desc = [];
      state.img = [];
    },
  },
});

export const {
  setTitle,
  setPrice,
  setCat,
  setInstock,
  setColor,
  setSize,
  setDesc,
  setImg,
} = createProduct.actions;

export default createProduct.reducer;
