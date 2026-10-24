import { StrictMode } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ReceiptPortfolio from "./ReceiptPortfolio";

jest.mock("./GrainientBackground", () => () => null);
jest.mock("./ThermalImage", () => () => null);

let reduceMotion = false;

beforeEach(() => {
  jest.useFakeTimers();
  reduceMotion = false;
  window.history.replaceState(null, "", "/");
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 10000,
  });
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: reduceMotion,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  jest.useRealTimers();
});

test("greets, prints, then unlocks reading when the paper animation ends", () => {
  render(
    <StrictMode>
      <ReceiptPortfolio />
    </StrictMode>,
  );
  const paper = screen.getByRole("main");
  const feed = screen.getByRole("button", {
    name: "Feed receipt: scroll down",
  });
  expect(screen.getByRole("status")).toHaveTextContent(
    "Hey, glad you’re here.",
  );
  expect(document.documentElement.style.overflow).toBe("hidden");
  expect(paper).toHaveAttribute("inert");
  expect(feed).toBeDisabled();
  act(() => {
    jest.advanceTimersByTime(900);
  });
  expect(screen.getByText("PRINTING")).toBeInTheDocument();
  const end = new Event("animationend", { bubbles: true });
  Object.defineProperty(end, "animationName", { value: "receipt-arrival" });
  fireEvent(paper, end);
  expect(screen.getByRole("status")).toHaveTextContent(
    "Scroll to print the rest",
  );
  expect(document.documentElement.style.overflow).toBe("");
  expect(document.body.style.overflow).toBe("");
  expect(paper).not.toHaveAttribute("inert");
  expect(feed).toBeEnabled();
});

test("unlocks even when animationend never fires", () => {
  render(<ReceiptPortfolio />);
  act(() => {
    jest.advanceTimersByTime(3500);
  });
  expect(document.documentElement.style.overflow).toBe("hidden");
  expect(screen.getByRole("main")).toHaveAttribute("inert");
  act(() => {
    jest.advanceTimersByTime(500);
  });
  expect(document.documentElement.style.overflow).toBe("");
  expect(screen.getByRole("main")).not.toHaveAttribute("inert");
});

test.each(["reduced motion", "section link", "restored scroll"])(
  "skips the wait for %s",
  (mode) => {
    if (mode === "reduced motion") reduceMotion = true;
    if (mode === "section link")
      window.history.replaceState(null, "", "/#projects");
    if (mode === "restored scroll")
      Object.defineProperty(window, "scrollY", { value: 500 });
    render(<ReceiptPortfolio />);
    expect(document.documentElement.style.overflow).toBe("");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Scroll to print the rest",
    );
    expect(screen.getByRole("main")).not.toHaveAttribute("inert");
  },
);

test("skip link releases the intro immediately", () => {
  render(<ReceiptPortfolio />);
  fireEvent.click(screen.getByText("Skip to content"));
  expect(document.documentElement.style.overflow).toBe("");
  expect(screen.getByRole("main")).not.toHaveAttribute("inert");
});

test("unmount restores existing overflow styles and clears the timers", () => {
  document.body.style.overflow = "clip";
  const { unmount } = render(<ReceiptPortfolio />);
  unmount();
  expect(document.documentElement.style.overflow).toBe("");
  expect(document.body.style.overflow).toBe("clip");
  expect(jest.getTimerCount()).toBe(0);
  document.body.style.overflow = "";
});
