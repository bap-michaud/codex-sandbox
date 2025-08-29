import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page';

describe('Home', () => {
  it('renders the heading', () => {
    render(<Home />);
    const heading = screen.getByText(/Todo App/i);
    expect(heading).toBeInTheDocument();
  });

  it('adds a new todo', () => {
    render(<Home />);
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const dateInput = screen.getByTestId('date-input');
    const addButton = screen.getByText(/Add Todo/i);

    fireEvent.change(nameInput, { target: { value: 'Test Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01T12:00' } });
    fireEvent.click(addButton);

    const todoName = screen.getByText(/Test Todo/i);
    const todoDescription = screen.getByText(/Test Description/i);
    expect(todoName).toBeInTheDocument();
    expect(todoDescription).toBeInTheDocument();
  });

  it('terminates a todo', () => {
    render(<Home />);
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const dateInput = screen.getByTestId('date-input');
    const addButton = screen.getByText(/Add Todo/i);

    fireEvent.change(nameInput, { target: { value: 'Test Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01T12:00' } });
    fireEvent.click(addButton);

    const terminateButton = screen.getByTestId('terminate-button-0'); // Adjusted to use test ID;
    fireEvent.click(terminateButton);

    expect(terminateButton).toBeDisabled();
  });

  it('deletes a todo', () => {
    render(<Home />);
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const dateInput = screen.getByTestId('date-input');
    const addButton = screen.getByText(/Add Todo/i);

    fireEvent.change(nameInput, { target: { value: 'Test Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01T12:00' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByTestId('delete-button-0'); // Adjusted to use test ID;
    fireEvent.click(deleteButton);

    const todoName = screen.queryByText(/Test Todo/i);
    expect(todoName).not.toBeInTheDocument();
  });
});
