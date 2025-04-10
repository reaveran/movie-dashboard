import { describe, expect, it, vi } from "vitest";

import { getImageUrl } from "./getImageUrl";

vi.mock("@/config/constant", () => ({
  default: {
    imageUrl: "https://cdn.example.com/images/",
  },
}));

describe("getImageUrl", () => {
  it("should concatenate the base image URL with the image name", () => {
    const result = getImageUrl("poster.jpg");
    expect(result).toBe("https://cdn.example.com/images/poster.jpg");
  });

  it("should handle empty image name", () => {
    const result = getImageUrl("");
    expect(result).toBe("https://cdn.example.com/images/");
  });
});
