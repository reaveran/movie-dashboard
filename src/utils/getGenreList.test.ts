import { describe, expect, it, vi } from "vitest";

import { getGenreList } from "./getGenreList";

vi.mock("@/config/genreMap", () => ({
  movieGenreMap: [
    { id: 1, name: "Action" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "Drama" },
  ],
  tvShowGenreMap: [
    { id: 10, name: "Documentary" },
    { id: 11, name: "Reality" },
    { id: 12, name: "Sci-Fi" },
  ],
}));

describe("getGenreList", () => {
  it("should return comma-separated genre names for movie", () => {
    const result = getGenreList([1, 3], "movie");
    expect(result).toBe("Action, Drama");
  });

  it("should return comma-separated genre names for tv show", () => {
    const result = getGenreList([10, 12], "tv");
    expect(result).toBe("Documentary, Sci-Fi");
  });

  it("should return - when no matching genre ids found", () => {
    const result = getGenreList([999], "movie");
    expect(result).toBe("-");
  });

  it("should return - when list is empty", () => {
    const result = getGenreList([], "tv");
    expect(result).toBe("-");
  });
});
