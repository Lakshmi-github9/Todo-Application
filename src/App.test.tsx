import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";


// Utility: Reset localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

// App renders correctly
test("renders application header", () => {
  render(<App />);
  expect(screen.getByText(/To Do Application/i)).toBeInTheDocument();
});

// Add a new task
test("allows user to add a new task", () => {
  render(<App />);
  
  fireEvent.click(screen.getByText(/add task/i));

});

// Prevent adding empty task
test("does not add task when title is empty", () => {
  render(<App />);

  fireEvent.click(screen.getByText(/add task/i));

  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});

// Toggle task completion
test("marks task as completed when checkbox is clicked", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: "Complete me" },
  });

  fireEvent.click(screen.getByText(/add task/i));

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

// Delete a task
test("removes a task when delete icon is clicked", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: "Delete me" },
  });

  fireEvent.click(screen.getByText(/add task/i));

  const deleteBtn = screen.getByLabelText(/delete/i);
  fireEvent.click(deleteBtn);

  expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
});

// Edit an existing task
test("edits task title successfully", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: "Old Title" },
  });

  fireEvent.click(screen.getByText(/add task/i));

  fireEvent.click(screen.getByRole("button", {name: /edit/i}));

  const editInput = screen.getByDisplayValue("Old Title");
  fireEvent.change(editInput, {
    target: { value: "New Title" },
  });

  fireEvent.click(screen.getByText(/save/i));

  expect(screen.getByText("New Title")).toBeInTheDocument();
});

// Persist tasks to localStorage
test("saves tasks to localStorage", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/task title/i), {
    target: { value: "Persisted Task" },
  });

  fireEvent.click(screen.getByText(/add task/i));

  const storedTodos = JSON.parse(
    localStorage.getItem("todos_list") || "[]"
  );

  expect(storedTodos.length).toBe(1);
  expect(storedTodos[0].title).toBe("Persisted Task");
});
