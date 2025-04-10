import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { formatDate } from "@/utils";
import { store } from "@/store/store";

import MovieDialog from "./MovieDialog";

// Mocks
vi.mock("@/utils", async () => ({
  formatDate: (date: string) => `Formatted: ${date}`,
  getGenreList: () => "Action, Comedy",
  getImageUrl: (name: string) => `mocked-url/${name}`,
}));

vi.mock("@/hooks/favorite", () => ({
  useAddToFavorite: () => vi.fn(),
  useRemoveFromFavorite: () => vi.fn(),
}));

vi.mock("@/store/session/selectors", () => ({
  favoriteSelector: () => [],
}));

const mockMovie = {
  id: 1,
  title: "Test Movie",
  release_date: "2024-01-01",
  genre_ids: [1, 2],
  backdrop_path: "backdrop.jpg",
  overview: "Test movie overview.",
};

describe("MovieDialog", () => {
  beforeAll(() => {
    // Mock animate to prevent ripple-related errors
    Element.prototype.animate =
      Element.prototype.animate ||
      (() => ({
        finished: Promise.resolve(),
        cancel: () => {},
      }));
  });

  it("renders movie information", () => {
    render(
      <Provider store={store}>
        <MovieDialog open={true} movie={mockMovie} onClose={() => {}} />
      </Provider>,
    );

    expect(screen.getByText("Test Movie")).toBeDefined();
    expect(
      screen.getByText(`Release date: ${formatDate("2024-01-01")}`),
    ).toBeDefined();
    expect(screen.getByText("Genre: Action, Comedy")).toBeDefined();
    expect(screen.getByText("Test movie overview.")).toBeDefined();
    expect(
      screen.getByRole("button", { name: /add to favorites/i }),
    ).toBeDefined();
  });

  it("calls onClose when Xmark button is clicked", () => {
    const onClose = vi.fn();

    render(
      <Provider store={store}>
        <MovieDialog open={true} movie={mockMovie} onClose={onClose} />
      </Provider>,
    );

    const closeButton = screen.getByTestId("close-dialog-button"); // since Xmark has no aria-label
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
