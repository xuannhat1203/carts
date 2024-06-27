import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../../Interface";

const initialState: { carts: Item[] } = {
  carts: [],
};

export const getItem2: any = createAsyncThunk("carts/getAllCarts", async () => {
  const response = await axios.get("http://localhost:8080/carts");
  return response.data;
});

export const deleteItem: any = createAsyncThunk(
  "carts/deleteItem",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/carts/${id}`);
    return id;
  }
);

export const addItemToCart: any = createAsyncThunk(
  "carts/addItemToCart",
  async (item: Item) => {
    const response = await axios.post("http://localhost:8080/carts", item);
    return response.data;
  }
);

export const updateCartItemQuantity: any = createAsyncThunk(
  "carts/updateCartItemQuantity",
  async ({ item, quantity }: { item: Item; quantity: number }) => {
    const response = await axios.put(`http://localhost:8080/carts/${item.id}`, {
      ...item,
      quantity,
    });
    return response.data;
  }
);

const cartReducers = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItem2.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.carts = state.carts.filter((item) => item.id !== action.payload);
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.carts.push(action.payload);
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        console.log(updatedItem, updatedItem.id);

        const index = state.carts.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.carts[index] = updatedItem;
        }
      });
  },
});

export default cartReducers.reducer;
