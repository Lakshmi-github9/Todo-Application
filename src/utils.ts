import { Todo } from "./types";
import { isBefore, isSameDay, parseISO } from "date-fns";

const STORAGE_KEY = "todos_list";

export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {}
};

export const getTodoRowStyle = (todo: Todo) => {
  const today = new Date();
  console.log("today",today)

  if (todo.completed) {
    return { backgroundColor: "#e6ffe6", textDecoration: "line-through" };
  }

  const due = parseISO(todo.dueDate);
  console.log("due",due)

  if (isSameDay(due, today)) {
    return { backgroundColor: "#fff4cc" };
  }

  if (isBefore(due, today)) {
    return { backgroundColor: "#ffcccc" };
  }

  return {};
};
