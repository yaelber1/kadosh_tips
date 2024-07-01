import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeForm from "../src/EmployeeForm";

test("renders EmployeeForm component", () => {
  render(<EmployeeForm onSubmit={jest.fn()} />);
  expect(screen.getByLabelText("שם עובד/ת")).toBeInTheDocument();
  expect(screen.getByLabelText("מספר שעות עובד/ת")).toBeInTheDocument();
  expect(screen.getByLabelText("סוג עובד/ת")).toBeInTheDocument();
});

test("shows error when form is submitted with empty fields", () => {
  render(<EmployeeForm onSubmit={jest.fn()} />);
  fireEvent.click(screen.getByText("הבא"));
  expect(screen.getByText("יש למלא את כל השדות")).toBeInTheDocument();
});

test("shows error when only the name field is filled", () => {
  render(<EmployeeForm onSubmit={jest.fn()} />);
  fireEvent.change(screen.getByLabelText("שם עובד/ת"), {
    target: { value: "John Doe" },
  });
  fireEvent.click(screen.getByText("הבא"));
  expect(screen.getByText("יש למלא את כל השדות")).toBeInTheDocument();
});

test("shows error when only the hours field is filled", () => {
  render(<EmployeeForm onSubmit={jest.fn()} />);
  fireEvent.change(screen.getByLabelText("מספר שעות עובד/ת"), {
    target: { value: "5" },
  });
  fireEvent.click(screen.getByText("הבא"));
  expect(screen.getByText("יש למלא את כל השדות")).toBeInTheDocument();
});

test("shows error when only the type field is filled", () => {
  render(<EmployeeForm onSubmit={jest.fn()} />);
  fireEvent.mouseDown(screen.getByLabelText("סוג עובד/ת"));
  fireEvent.click(screen.getByText("ברמנ/ית על 35"));
  fireEvent.click(screen.getByText("הבא"));
  expect(screen.getByText("יש למלא את כל השדות")).toBeInTheDocument();
});

test("shows error when only the name and hours fields are filled", () => {
  render(<EmployeeForm onSubmit={jest.fn()} />);
  fireEvent.change(screen.getByLabelText("שם עובד/ת"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("מספר שעות עובד/ת"), {
    target: { value: "5" },
  });
  fireEvent.click(screen.getByText("הבא"));
  expect(screen.getByText("יש למלא את כל השדות")).toBeInTheDocument();
});

test("shows error when only the name and type fields are filled", () => {
  render(<EmployeeForm onSubmit={jest.fn()} />);
  fireEvent.change(screen.getByLabelText("שם עובד/ת"), {
    target: { value: "John Doe" },
  });
  fireEvent.mouseDown(screen.getByLabelText("סוג עובד/ת"));
  fireEvent.click(screen.getByText("ברמנ/ית על 35"));
  fireEvent.click(screen.getByText("הבא"));
  expect(screen.getByText("יש למלא את כל השדות")).toBeInTheDocument();
});

test("shows error when only the hours and type fields are filled", () => {
  render(<EmployeeForm onSubmit={jest.fn()} />);
  fireEvent.change(screen.getByLabelText("מספר שעות עובד/ת"), {
    target: { value: "5" },
  });
  fireEvent.mouseDown(screen.getByLabelText("סוג עובד/ת"));
  fireEvent.click(screen.getByText("ברמנ/ית על 35"));
  fireEvent.click(screen.getByText("הבא"));
  expect(screen.getByText("יש למלא את כל השדות")).toBeInTheDocument();
});

test("calls onSubmit with correct data", () => {
  const handleSubmit = jest.fn();
  render(<EmployeeForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText("שם עובד/ת"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("מספר שעות עובד/ת"), {
    target: { value: "8" },
  });

  // Simulate opening the Select dropdown and selecting a MenuItem
  fireEvent.mouseDown(screen.getByLabelText("סוג עובד/ת"));
  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText(/ברמנ\/ית על 35/i));

  fireEvent.click(screen.getByText("הבא"));

  expect(handleSubmit).toHaveBeenCalledWith({
    name: "John Doe",
    hours: "8",
    category: "bar_35",
  });
});

test("disables button after submission", () => {
  const handleSubmit = jest.fn();
  render(<EmployeeForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText("שם עובד/ת"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("מספר שעות עובד/ת"), {
    target: { value: "8" },
  });

  fireEvent.mouseDown(screen.getByLabelText("סוג עובד/ת"));
  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText(/ברמנ\/ית על 35/i));

  fireEvent.click(screen.getByText("הבא"));

  expect(screen.getByText("הבא")).toBeDisabled();
});

test("error messages disappear after correcting input", () => {
  render(<EmployeeForm onSubmit={jest.fn()} />);

  fireEvent.click(screen.getByText("הבא"));
  expect(screen.getByText("יש למלא את כל השדות")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("שם עובד/ת"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("מספר שעות עובד/ת"), {
    target: { value: "8" },
  });

  fireEvent.mouseDown(screen.getByLabelText("סוג עובד/ת"));
  const listbox = within(screen.getByRole("listbox"));
  fireEvent.click(listbox.getByText(/ברמנ\/ית על 35/i));

  fireEvent.click(screen.getByText("הבא"));

  expect(screen.queryByText("יש למלא את כל השדות")).not.toBeInTheDocument();
});
