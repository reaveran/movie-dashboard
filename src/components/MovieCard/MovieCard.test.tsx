import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MovieCard from "./MovieCard";

// Mock image and utils
vi.mock("@/utils", async () => {
  const actual = await vi.importActual("@/utils");
  return {
    ...actual,
    getImageUrl: (path: string) => `mocked-url/${path}`,
    formatDate: (date: string, yearOnly?: boolean) =>
      yearOnly ? "2024" : "01 January 2024",
  };
});

const mockMovie = {
  id: 1,
  title: "Inception",
  release_date: "2010-07-16",
  poster_path: "inception.jpg",
} as const;

describe("MovieCard", () => {
  it("renders movie title and year", () => {
    render(<MovieCard movie={mockMovie} onClick={() => {}} />);

    expect(screen.getByText("Inception")).toBeDefined();
    expect(screen.getByText("2024")).toBeDefined(); // from mocked formatDate
  });

  it("renders poster image", () => {
    render(<MovieCard movie={mockMovie} onClick={() => {}} />);

    const image = screen.getByAltText("Inception") as HTMLImageElement;
    expect(image).toBeDefined();
    expect(image.src).toContain("mocked-url/inception.jpg");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<MovieCard movie={mockMovie} onClick={handleClick} />);

    const card = screen.getByText("Inception").closest("div");
    fireEvent.click(card!);

    expect(handleClick).toHaveBeenCalled();
  });
});
