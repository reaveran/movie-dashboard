import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Main from "./Main";

describe("Main component", () => {
  it("renders Header, Footer, and Outlet", () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>,
    );

    expect(screen.getByText("© 2025 - All Rights Reserved.")).toBeDefined();
  });
});
