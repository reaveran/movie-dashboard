import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Header from "./Header";

vi.mock("@/assets/images/png/full-logo.png", () => ({
  default: "logo.png",
}));

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header setMobileMenuOpen={() => {}} />);
    const logo = screen.getByAltText("SirCo Logo") as HTMLImageElement;
    expect(logo).toBeDefined();
    expect(logo.src).toContain("logo.png");
  });

  it("calls setMobileMenuOpen when the menu button is clicked", () => {
    const mockFn = vi.fn();
    render(<Header setMobileMenuOpen={mockFn} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
