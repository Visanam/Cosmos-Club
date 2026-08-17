import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Oru from "./Oru";

vi.mock("@/components/Seo", () => ({ Seo: () => null }));

describe("Enter Oru", () => {
  afterEach(cleanup);

  it("uses a full-page cinematic passage and routes visitors to practical next steps", () => {
    render(<Oru />);
    expect(screen.getByTestId("oru-page")).toBeTruthy();
    expect(screen.getByLabelText(/blue-hour walk through the lantern-lit village/i).getAttribute("src")).toContain("oru-lantern-walk_62921437.mp4");
    expect(screen.getByRole("link", { name: /begin with your family’s moment/i }).getAttribute("href")).toBe("/parents");
    expect(screen.getByRole("link", { name: /explore the values/i }).getAttribute("href")).toBe("/values");
  });
});
