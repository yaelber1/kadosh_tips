import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import NumberInputBox from "../src/NumberInputBox";

describe("NumberInputBox Component", () => {
  test("renders initial inputs and button", () => {
    render(<NumberInputBox />);
    expect(screen.getByLabelText(/הזן סה״כ כסף מזומן/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/הזן מספר עובדים במשמרת/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /חשבו/i })).toBeInTheDocument();
  });

  test("changes initial money input", () => {
    render(<NumberInputBox />);
    const initialMoneyInput = screen.getByLabelText(/הזן סה״כ כסף מזומן/i);
    fireEvent.change(initialMoneyInput, { target: { value: "1000" } });
    expect(initialMoneyInput.value).toBe("1000");
  });

  test("changes number of forms input", () => {
    render(<NumberInputBox />);
    const numberOfFormsInput = screen.getByLabelText(/הזן מספר עובדים במשמרת/i);
    fireEvent.change(numberOfFormsInput, { target: { value: "3" } });
    expect(numberOfFormsInput.value).toBe("3");
    // Check if the form fields for the 3 employees are rendered
    expect(screen.getByText(/עובד מספר 1/i)).toBeInTheDocument();
    expect(screen.getByText(/עובד מספר 2/i)).toBeInTheDocument();
    expect(screen.getByText(/עובד מספר 3/i)).toBeInTheDocument();
  });

  test("form submission updates the state and calculations are correct for one form", async () => {
    render(<NumberInputBox />);
    const initialMoneyInput = screen.getByLabelText(/הזן סה״כ כסף מזומן/i);
    const numberOfFormsInput = screen.getByLabelText(/הזן מספר עובדים במשמרת/i);

    fireEvent.change(initialMoneyInput, { target: { value: "1000" } });
    fireEvent.change(numberOfFormsInput, { target: { value: "1" } });

    // Fill out the form
    fireEvent.input(screen.getByLabelText(/שם עובד\/ת/i), {
      target: { value: "Employee 1" },
    });
    fireEvent.input(screen.getByLabelText(/מספר שעות עובד\/ת/i), {
      target: { value: "5" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/סוג עובד\/ת/i));
    const categoryOptions = within(screen.getByRole("listbox")).getAllByRole(
      "option"
    );
    fireEvent.click(
      categoryOptions.find(
        (option) => option.getAttribute("data-value") === "bar_tips"
      )
    );
    fireEvent.click(screen.getByRole("button", { name: /הבא/i }));

    // Click the calculate button
    fireEvent.click(screen.getByRole("button", { name: /חשבו/i }));

    // Check if the results are displayed
    expect(screen.getByText(/כמה לשעה/i)).toBeInTheDocument();
    expect(screen.getByText(/הפרשה/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee 1/i)).toBeInTheDocument();
  });

  test("shows error when the input is invalid", () => {
    render(<NumberInputBox />);
    const numberOfFormsInput = screen.getByLabelText(/הזן מספר עובדים במשמרת/i);
    fireEvent.change(numberOfFormsInput, { target: { value: "-1" } });
    expect(
      screen.getByText(/מספר עובדים חייב להיות גדול מ-0/i)
    ).toBeInTheDocument();
  });

  test("displays error if there is more expenditure than initial money", async () => {
    render(<NumberInputBox />);
    const initialMoneyInput = screen.getByLabelText(/הזן סה״כ כסף מזומן/i);
    const numberOfFormsInput = screen.getByLabelText(/הזן מספר עובדים במשמרת/i);

    fireEvent.change(initialMoneyInput, { target: { value: "50" } });
    fireEvent.change(numberOfFormsInput, { target: { value: "1" } });

    // Fill out the form
    fireEvent.input(screen.getByLabelText(/שם עובד\/ת/i), {
      target: { value: "Employee 1" },
    });
    fireEvent.input(screen.getByLabelText(/מספר שעות עובד\/ת/i), {
      target: { value: "2" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/סוג עובד\/ת/i));
    const categoryOptions = within(screen.getByRole("listbox")).getAllByRole(
      "option"
    );
    fireEvent.click(
      categoryOptions.find(
        (option) => option.getAttribute("data-value") === "waiter_35"
      )
    );
    fireEvent.click(screen.getByRole("button", { name: /הבא/i }));

    fireEvent.click(screen.getByRole("button", { name: /חשבו/i }));

    expect(screen.getByText(/יש יותר הפרשה מכסף מזומן/i)).toBeInTheDocument();
  });

  test("form submission updates the state and calculations are correct for one form (waiter_tips)", async () => {
    render(<NumberInputBox />);
    const initialMoneyInput = screen.getByLabelText(/הזן סה״כ כסף מזומן/i);
    const numberOfFormsInput = screen.getByLabelText(/הזן מספר עובדים במשמרת/i);

    fireEvent.change(initialMoneyInput, { target: { value: "100" } });
    fireEvent.change(numberOfFormsInput, { target: { value: "1" } });

    // Fill out the form
    fireEvent.input(screen.getByLabelText(/שם עובד\/ת/i), {
      target: { value: "Employee 1" },
    });
    fireEvent.input(screen.getByLabelText(/מספר שעות עובד\/ת/i), {
      target: { value: "2" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/סוג עובד\/ת/i));
    const categoryOptions = within(screen.getByRole("listbox")).getAllByRole(
      "option"
    );
    fireEvent.click(
      categoryOptions.find(
        (option) => option.getAttribute("data-value") === "waiter_tips"
      )
    );
    fireEvent.click(screen.getByRole("button", { name: /הבא/i }));

    fireEvent.click(screen.getByRole("button", { name: /חשבו/i }));

    expect(screen.getByText(/כמה לשעה/i)).toBeInTheDocument();
    expect(screen.getByText(/הפרשה/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee 1/i)).toBeInTheDocument();
  });

  test("form submission updates the state and calculations are correct for one form (bar_tips)", async () => {
    render(<NumberInputBox />);
    const initialMoneyInput = screen.getByLabelText(/הזן סה״כ כסף מזומן/i);
    const numberOfFormsInput = screen.getByLabelText(/הזן מספר עובדים במשמרת/i);

    fireEvent.change(initialMoneyInput, { target: { value: "100" } });
    fireEvent.change(numberOfFormsInput, { target: { value: "1" } });

    // Fill out the form
    fireEvent.input(screen.getByLabelText(/שם עובד\/ת/i), {
      target: { value: "Employee 1" },
    });
    fireEvent.input(screen.getByLabelText(/מספר שעות עובד\/ת/i), {
      target: { value: "2" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/סוג עובד\/ת/i));
    const categoryOptions = within(screen.getByRole("listbox")).getAllByRole(
      "option"
    );
    fireEvent.click(
      categoryOptions.find(
        (option) => option.getAttribute("data-value") === "waiter_tips"
      )
    );
    fireEvent.click(screen.getByRole("button", { name: /הבא/i }));

    fireEvent.click(screen.getByRole("button", { name: /חשבו/i }));

    expect(screen.getByText(/כמה לשעה/i)).toBeInTheDocument();
    expect(screen.getByText(/הפרשה/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee 1/i)).toBeInTheDocument();
  });

  test("form submission updates the state and calculations are correct for one form (incharge)", async () => {
    render(<NumberInputBox />);
    const initialMoneyInput = screen.getByLabelText(/הזן סה״כ כסף מזומן/i);
    const numberOfFormsInput = screen.getByLabelText(/הזן מספר עובדים במשמרת/i);

    fireEvent.change(initialMoneyInput, { target: { value: "100" } });
    fireEvent.change(numberOfFormsInput, { target: { value: "1" } });

    // Fill out the form
    fireEvent.input(screen.getByLabelText(/שם עובד\/ת/i), {
      target: { value: "Employee 1" },
    });
    fireEvent.input(screen.getByLabelText(/מספר שעות עובד\/ת/i), {
      target: { value: "2" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/סוג עובד\/ת/i));
    const categoryOptions = within(screen.getByRole("listbox")).getAllByRole(
      "option"
    );
    fireEvent.click(
      categoryOptions.find(
        (option) => option.getAttribute("data-value") === "incharge"
      )
    );
    fireEvent.click(screen.getByRole("button", { name: /הבא/i }));

    fireEvent.click(screen.getByRole("button", { name: /חשבו/i }));

    expect(screen.getByText(/כמה לשעה/i)).toBeInTheDocument();
    expect(screen.getByText(/הפרשה/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee 1/i)).toBeInTheDocument();
  });

  test("form submission updates the state and calculations are correct for one form (waiter_35)", async () => {
    render(<NumberInputBox />);
    const initialMoneyInput = screen.getByLabelText(/הזן סה״כ כסף מזומן/i);
    const numberOfFormsInput = screen.getByLabelText(/הזן מספר עובדים במשמרת/i);

    fireEvent.change(initialMoneyInput, { target: { value: "1000" } });
    fireEvent.change(numberOfFormsInput, { target: { value: "1" } });

    // Fill out the form
    fireEvent.input(screen.getByLabelText(/שם עובד\/ת/i), {
      target: { value: "Employee 1" },
    });
    fireEvent.input(screen.getByLabelText(/מספר שעות עובד\/ת/i), {
      target: { value: "2" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/סוג עובד\/ת/i));
    const categoryOptions = within(screen.getByRole("listbox")).getAllByRole(
      "option"
    );
    fireEvent.click(
      categoryOptions.find(
        (option) => option.getAttribute("data-value") === "waiter_35"
      )
    );
    fireEvent.click(screen.getByRole("button", { name: /הבא/i }));

    fireEvent.click(screen.getByRole("button", { name: /חשבו/i }));

    expect(screen.getByText(/אין עובדים על טיפים/i)).toBeInTheDocument();
  });

  test("form submission updates the state and calculations are correct for one form (bar_35)", async () => {
    render(<NumberInputBox />);
    const initialMoneyInput = screen.getByLabelText(/הזן סה״כ כסף מזומן/i);
    const numberOfFormsInput = screen.getByLabelText(/הזן מספר עובדים במשמרת/i);

    fireEvent.change(initialMoneyInput, { target: { value: "1000" } });
    fireEvent.change(numberOfFormsInput, { target: { value: "1" } });

    // Fill out the form
    fireEvent.input(screen.getByLabelText(/שם עובד\/ת/i), {
      target: { value: "Employee 1" },
    });
    fireEvent.input(screen.getByLabelText(/מספר שעות עובד\/ת/i), {
      target: { value: "2" },
    });
    fireEvent.mouseDown(screen.getByLabelText(/סוג עובד\/ת/i));
    const categoryOptions = within(screen.getByRole("listbox")).getAllByRole(
      "option"
    );
    fireEvent.click(
      categoryOptions.find(
        (option) => option.getAttribute("data-value") === "bar_35"
      )
    );
    fireEvent.click(screen.getByRole("button", { name: /הבא/i }));

    fireEvent.click(screen.getByRole("button", { name: /חשבו/i }));

    expect(screen.getByText(/אין עובדים על טיפים/i)).toBeInTheDocument();
  });
});
