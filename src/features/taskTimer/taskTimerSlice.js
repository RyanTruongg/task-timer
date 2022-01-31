import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTaskId: null,
};

export const taskTimerSlice = createSlice({
  name: "taskTimer",
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.currentTaskId = action.payload;
    },
  },
});

export const { setCurrentTask } = taskTimerSlice.actions;

export default taskTimerSlice.reducer;
