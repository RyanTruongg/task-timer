import { createEntityAdapter } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter({
  selectId: (task) => task.id,
});

export default tasksAdapter;
