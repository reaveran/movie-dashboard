// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MovieList from "./MovieList";

// Mocks for child components
vi.mock("../MovieCard/MovieCard", () => ({
  __esModule: true,
  default: React.forwardRef(({ movie, onClick }: unknown, ref) => (
    <div data-testid={`movie-${movie.id}`} ref={ref} onClick={onClick}>
      {movie.title}
    </div>
  )),
}));

vi.mock("../MovieDialog/MovieDialog", () => ({
  __esModule: true,
  default: ({ open, movie, onClose }: unknown) =>
    open ? (
      <div>
        <div>{movie.title} Details</div>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

const moviesMock = [
  { id: 1, title: "Movie 1" },
  { id: 2, title: "Movie 2" },
];

describe("MovieList", () => {
  beforeAll(() => {
    // Mock animate to prevent ripple-related errors
    Element.prototype.animate =
      Element.prototype.animate ||
      (() => ({
        finished: Promise.resolve(),
        cancel: () => {},
      }));
  });

  it("renders movies", () => {
    render(<MovieList movies={moviesMock} />);
    expect(screen.getByText("Movie 1")).toBeDefined();
    expect(screen.getByText("Movie 2")).toBeDefined();
  });

  it("shows 'No movie found' when empty", () => {
    render(<MovieList movies={[]} isLoading={false} />);
    expect(screen.getByText("No movie found")).toBeDefined();
  });

  it("calls onShowMore when 'Show more' is clicked", () => {
    const onShowMore = vi.fn();
    render(<MovieList movies={moviesMock} hasMore onShowMore={onShowMore} />);
    fireEvent.click(screen.getByTestId("show-more-button"));
    expect(onShowMore).toHaveBeenCalled();
  });

  it("opens and closes movie dialog on card click", () => {
    render(<MovieList movies={moviesMock} />);

    fireEvent.click(screen.getByTestId(`movie-${moviesMock[0].id}`));
    expect(screen.getByText("Movie 1 Details")).toBeDefined();

    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText("Movie 1 Details")).toBeNull();
  });

  it("shows loading skeleton when isLoading is true", () => {
    render(<MovieList movies={[]} isLoading />);
    const skeletons = screen.getAllByRole("generic"); // skeleton divs have no role, generic is default
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
