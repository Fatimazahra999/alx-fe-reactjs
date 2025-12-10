import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial render
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the component renders
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check for input and button
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  // Test 2: Adding a new todo
  test('adds a new todo when form is submitted', async () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Check if new todo is added
    await waitFor(() => {
      expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    });
  });

  // Test 3: Toggling todo completion
  test('toggles todo completion when clicked', () => {
    render(<TodoList />);
    
    const todoItem = screen.getByText('Learn React');
    
    // Initial state should not have line-through
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle completion
    fireEvent.click(todoItem);
    
    // Should now have line-through
    expect(todoItem).toHaveStyle('text-decoration: line-through');
    
    // Click again to untoggle
    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting a todo
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Check initial count
    const initialTodos = screen.getAllByRole('listitem');
    const initialCount = initialTodos.length;
    
    // Delete the first todo
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Check if todo is deleted
    const remainingTodos = screen.getAllByRole('listitem');
    expect(remainingTodos.length).toBe(initialCount - 1);
    
    // Verify the specific todo is gone
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  // Test 5: Empty input should not add todo
  test('does not add todo when input is empty', () => {
    render(<TodoList />);
    
    const initialTodos = screen.getAllByRole('listitem');
    const initialCount = initialTodos.length;
    
    const addButton = screen.getByText('Add Todo');
    
    // Try to add empty todo
    fireEvent.click(addButton);
    
    // Count should remain the same
    const currentTodos = screen.getAllByRole('listitem');
    expect(currentTodos.length).toBe(initialCount);
  });
});
