import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "./Footer";

describe("Footer component", () => {
  it("renders footer with text correctly", () => {
    render(<Footer />);
    expect(screen.getByText("© 2025 - All Rights Reserved.")).toBeDefined();
  });
});
