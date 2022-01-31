import tasksAdapter from "./tasksAdapter";

export const tasksSelectors = tasksAdapter.getSelectors((state) => state.tasks);
