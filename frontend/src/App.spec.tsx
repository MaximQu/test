import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "@/App.tsx";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  }),
) as jest.Mock;

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders heading", async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText(/Simple Todo List!/i)).toBeInTheDocument();
  });

  test("adds a new todo", async () => {
    await act(async () => {
      render(<App />);
    });

    const input = screen.getByPlaceholderText("Go to the gym");
    const addButton = screen.getByText("Add Todo");

    // Mock the fetch response for creating a todo
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "1",
            title: "Test Todo",
          }),
      }),
    );

    await act(async () => {
      fireEvent.change(input, { target: { value: "Test Todo" } });
      fireEvent.click(addButton);
    });

    expect(await screen.findByText("Test Todo")).toBeInTheDocument();
  });
});
