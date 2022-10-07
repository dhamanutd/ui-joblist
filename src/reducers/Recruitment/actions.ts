import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRecruitment,
  getRecruitments,
} from "../../services/api/recruitment";
import { initialState, IRecruitmentDetailType } from "./constants";

export const resolveGetRecruitments = createAsyncThunk(
  "resolve/recruitments",
  async (
    payload: {
      description: string;
      location: string;
      fulltime: boolean;
      page: number;
    },
    { rejectWithValue }
  ) => {
    const queries: Map<string, string | number | boolean> = new Map();
    queries.set("description", payload.description);
    queries.set("location", payload.location);
    queries.set("full_time", payload.fulltime);
    queries.set("page", payload.page);

    const response = await getRecruitments(queries);
    if (response.status === 200) {
      const data = response.data || [];
      return data.filter((item: IRecruitmentDetailType) => item);
    }
    return rejectWithValue(response.error);
  }
);

export const resolveGetRecruitment = createAsyncThunk(
  "resolve/recruitment",
  async (
    payload: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    const response = await getRecruitment(payload.id);
    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

export const recruitmentsReducerAction = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setParams: (state, { payload }) => {
      state.params[payload?.field] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resolveGetRecruitments.pending, (state) => {
      state.jobs.isError = false;
      state.jobs.isLoading = true;
    });
    builder.addCase(resolveGetRecruitments.fulfilled, (state, { payload }) => {
      state.jobs.isError = false;
      state.jobs.isLoading = false;
      state.jobs.data = payload || [];
    });
    builder.addCase(resolveGetRecruitments.rejected, (state) => {
      state.jobs.isError = true;
      state.jobs.isLoading = false;
    });
    builder.addCase(resolveGetRecruitment.pending, (state) => {
      state.detail.isError = false;
      state.detail.isLoading = true;
    });
    builder.addCase(resolveGetRecruitment.fulfilled, (state, { payload }) => {
      state.detail.isError = false;
      state.detail.isLoading = false;
      state.detail.data = payload || [];
    });
    builder.addCase(resolveGetRecruitment.rejected, (state) => {
      state.detail.isError = true;
      state.detail.isLoading = false;
    });
  },
});

export const { setParams } = recruitmentsReducerAction.actions;

export default recruitmentsReducerAction.reducer;
