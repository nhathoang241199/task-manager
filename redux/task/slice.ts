import { callGetTasks } from "@/services/task";
import { TASK_PER_PAGE } from "@/utils/constant";
import { TFilter, TTask } from "@/utils/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ page, status }: { page: number; status: TFilter }) => {
    const response = await callGetTasks({ page, status });
    return {
      data: response.data.data,
      page,
      status,
      totalTasks: response.data.items,
    };
  }
);

const initialState = {
  list: [] as TTask[],
  initStatus: false,
  status: "idle",
  error: "",
  totalTasks: 0,
  page: 1,
  filterStatus: "all",
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.list = action.payload;
      state.initStatus = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.data as TTask[];
        state.page = action.payload.page;
        state.filterStatus = action.payload.status;
        state.totalTasks = Math.ceil(action.payload.totalTasks / TASK_PER_PAGE);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const { setTaskList } = taskSlice.actions;
