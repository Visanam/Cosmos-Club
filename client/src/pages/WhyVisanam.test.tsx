import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import WhyVisanam from "./WhyVisanam";

vi.mock("@/components/Seo", () => ({ Seo: () => null }));
vi.mock("@/components/Reveal", () => ({ Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</> }));

describe("WhyVisanam", () => {
  afterEach(cleanup);
  it("explains the relationship, story, and family journey", () => {
    render(<WhyVisanam />);
    expect(screen.getByRole("heading", { name: /Not one more thing/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /The relationship/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /What happens in a story/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /One value/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Find a value to begin/i }).getAttribute("href")).toBe("/values");
    expect(screen.getByLabelText(/abstract glowing doorway/i)).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Made for ages 6–12/i })).toBeTruthy();
    expect(screen.getByText(/A story, not a diagnosis/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /Step into Oru/i }).getAttribute("href")).toBe("/oru");
    expect(screen.getByRole("link", { name: /Create your gentle plan/i }).getAttribute("href")).toBe("/parents");
  });
});
