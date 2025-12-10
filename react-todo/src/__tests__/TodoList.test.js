// src/components/TodoList.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TodoList from "./TodoList";

describe("TodoList component", () => {
  test("adds a todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByLabelText("todo-input");
    await user.type(input, "Test todo");
    await user.click(screen.getByText("Add"));

    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  test("toggles a todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByLabelText("todo-input");
    await user.type(input, "Toggle me");
    await user.click(screen.getByText("Add"));

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("removes a todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByLabelText("todo-input");
    await user.type(input, "Delete me");
    await user.click(screen.getByText("Add"));

    const removeButton = screen.getByLabelText(/remove-/i);
    await user.click(removeButton);

    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });
});
