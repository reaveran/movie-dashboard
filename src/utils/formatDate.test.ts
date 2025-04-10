import { describe, expect, it } from "vitest";

import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should format date to 'day month year'", () => {
    const input = "2024-04-10T00:00:00Z";
    const formatted = formatDate(input);
    expect(formatted).toBe("10 April 2024");
  });

  it("should return only the year if yearOnly is true", () => {
    const input = "2024-04-10T00:00:00Z";
    const formatted = formatDate(input, true);
    expect(formatted).toBe(2024);
  });

  it("should handle invalid date gracefully", () => {
    const input = "invalid-date";
    const formatted = formatDate(input);
    expect(formatted).toBe("Invalid Date");
  });
});
