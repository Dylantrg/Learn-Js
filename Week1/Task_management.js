let tasks = [
  { id: 1, title: "Learn closures", completed: false },
  { id: 2, title: "Practice this keyword", completed: true },
];
function addTask(tasks, title) {
  if (title === "") {
    console.log("Title cannot be empty");
    return tasks;
  }
  return [...tasks, { id: tasks.length + 1, title: title, completed: false }];
}
function completeTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { id: task.id, title: task.title, completed: true } : task
  );
}
function deleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}
function getCompletedTasks(tasks) {
  return tasks.filter((task) => task.completed === true);
}
function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}
