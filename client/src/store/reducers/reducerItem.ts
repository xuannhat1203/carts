import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../../Interface";

const items: Item[] = [];

export const getItem: any = createAsyncThunk("item/getAllItems", async () => {
  const res = await axios.get("http://localhost:8080/item");
  return res.data;
});

const itemReducer = createSlice({
  name: "item",
  initialState: {
    item: items,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItem.fulfilled, (state, action) => {
      state.item = action.payload;
    });
  },
});

export default itemReducer.reducer;
