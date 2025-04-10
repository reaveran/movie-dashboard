import React from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import Sidebar from "./Sidebar";

// Mock image
vi.mock("@/assets/images/png/full-logo.png", () => ({
  default: "mock-logo.png",
}));

// Mock useNavigate and useLocation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/",
    }),
  };
});

describe("Sidebar", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  beforeAll(() => {
    // Mock animate to prevent ripple-related errors
    Element.prototype.animate =
      Element.prototype.animate ||
      (() => ({
        finished: Promise.resolve(),
        cancel: () => {},
      }));
  });

  it("renders the logo image", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const logo = screen.getByAltText("nature-image") as HTMLImageElement;
    expect(logo).toBeDefined();
    expect(logo.src).toContain("mock-logo.png");
  });

  it("renders all menu items", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Favorites")).toBeDefined();
  });

  it("applies active class to current route", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const homeItem = screen.getByText("Home");
    expect(homeItem.className).toContain("text-orange-600");
  });

  it("navigates when a menu item is clicked", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const favoritesItem = screen.getByTestId("menu-favorites");
    fireEvent.click(favoritesItem);
    expect(mockNavigate).toHaveBeenCalledWith("/favorites");
  });
});
