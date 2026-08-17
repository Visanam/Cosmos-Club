import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import React from "react";
import Home from "./Home";

vi.mock("@/components/Seo", () => ({ Seo: () => null }));
vi.mock("@/components/Reveal", () => ({ Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/components/ParentValuesTour", () => ({ ParentValuesTour: () => null }));
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span {...props}>{children}</span>,
  },
  useReducedMotion: () => true,
  useScroll: () => ({ scrollY: {}, scrollYProgress: {} }),
  useTransform: () => 0,
}));

describe("art-directed home journey", () => {
  afterEach(cleanup);

  it("restores the day-to-night journey with a prominent Oru video opening and value discovery", () => {
    render(<Home />);
    expect(screen.getByTestId("art-directed-home")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Stories that help children/i })).toBeTruthy();
    expect(screen.queryByRole("group", { name: /Choose a value to practise/i })).toBeNull();
    const valuesLink = screen.getByRole("link", { name: /See the full value journey/i });
    expect(valuesLink.getAttribute("href")).toBe("/values");
    expect(screen.getByLabelText("Eight value practices")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Courage Confidence to act with uncertainty/i }).getAttribute("href")).toBe("/values#courage");
    expect(screen.getAllByRole("link", { name: /Enter Oru/i }).every((link) => link.getAttribute("href") === "/oru")).toBe(true);
    expect(screen.queryByRole("link", { name: /Meet the keepers/i })).toBeNull();
    expect(screen.getByRole("heading", { name: /One story. One question/i })).toBeTruthy();
    expect(screen.getByText(/A feeling becomes a story/i)).toBeTruthy();
    expect(screen.getByLabelText(/sunrise-to-night passage through Oru/i).getAttribute("src")).toContain("visanam-story-passage_408b210c.mp4");
  });
});
