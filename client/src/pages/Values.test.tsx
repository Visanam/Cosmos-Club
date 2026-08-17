import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Values from "./Values";

vi.mock("@/components/Seo", () => ({ Seo: () => null }));
vi.mock("@/components/Reveal", () => ({ Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</> }));

describe("Values", () => {
  afterEach(cleanup);
  it("makes every Visanam value available as a real-world practice", () => {
    render(<Values />);
    expect(screen.getByRole("heading", { name: /Small inner skills/i })).toBeTruthy();
    expect(screen.getByText("Anger Management")).toBeTruthy();
    expect(screen.getAllByText(/A familiar moment/i)).toHaveLength(8);
    expect(screen.queryByText(/Story glimpse/i)).toBeNull();
    expect(screen.queryByText("The bell at the old gate")).toBeNull();
    expect(screen.getByText(/There is no scorecard/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /Find your family’s starting point/i }).getAttribute("href")).toBe("/parents");
    expect(screen.getByRole("link", { name: /Create a gentle parent plan/i }).getAttribute("href")).toBe("/parents");
  });
});
