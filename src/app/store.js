import { configureStore } from "@reduxjs/toolkit";
import tasksReduce from "../features/tasks/tasksSlice";
import taskTimerReduce from "../features/taskTimer/taskTimerSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReduce,
    taskTimer: taskTimerReduce,
  },
});

store.subscribe(() => {
  localStorage.setItem("tasks", JSON.stringify(store.getState().tasks));
});
