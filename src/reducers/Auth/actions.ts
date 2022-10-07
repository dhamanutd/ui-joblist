import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/api/auth";
import { initialState } from "./constants";

export const resolveLogin = createAsyncThunk(
  "resolve/login",
  async (
    payload: {
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const response = await login(payload.username, payload.password);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const loginReducerAction = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setParams: (state, { payload }) => {
      state[payload.field] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resolveLogin.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(resolveLogin.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.token = payload || {};
    });
    builder.addCase(resolveLogin.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { setParams } = loginReducerAction.actions;

export default loginReducerAction.reducer;
