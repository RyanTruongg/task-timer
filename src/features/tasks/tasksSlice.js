import { createSlice } from "@reduxjs/toolkit";
import tasksAdapter from "./tasksAdapter";

const { ids, entities } = JSON.parse(localStorage.getItem("tasks"));

const initialState = tasksAdapter.getInitialState({
  ids: ids,
  entities: entities,
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: tasksAdapter.addOne,
    deleteTask: tasksAdapter.removeOne,
    updateTask: tasksAdapter.updateOne,
  },
});

export const { createTask, deleteTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
