import { configureStore } from "@reduxjs/toolkit";
import { tasksSelectors } from "../features/tasks/tasksSelector";
import tasksReduce, { updateTask } from "../features/tasks/tasksSlice";
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

setInterval(() => {
  const { currentTaskId } = store.getState().taskTimer;

  if (currentTaskId) {
    const currentTask = tasksSelectors.selectById(
      store.getState(),
      currentTaskId
    );
    store.dispatch(
      updateTask({
        id: currentTaskId,
        changes: { elapsed: currentTask.elapsed + 1 },
      })
    );
  }
}, 1000);
