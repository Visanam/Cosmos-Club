import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { SiteShell } from "./SiteShell";

vi.mock("wouter", () => ({
  Link: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a>,
  useLocation: () => ["/"],
}));

describe("SiteShell", () => {
  afterEach(cleanup);

  it("keeps the premium entry sequence focused on why, values, Enter Oru, and the parent journey", () => {
    render(<SiteShell><p>Page content</p></SiteShell>);

    expect(screen.getByRole("link", { name: /Visanam home/i }).getAttribute("href")).toBe("/");
    const primaryNav = screen.getByRole("navigation", { name: /Primary navigation/i });
    expect(primaryNav).toBeTruthy();
    expect(within(primaryNav).getByRole("link", { name: "Why Visanam" }).getAttribute("href")).toBe("/why-visanam");
    expect(within(primaryNav).getByRole("link", { name: "Values" }).getAttribute("href")).toBe("/values");
    expect(within(primaryNav).getByRole("link", { name: "Enter Oru" }).getAttribute("href")).toBe("/oru");
    expect(screen.getByRole("link", { name: /Start with your moment/i }).getAttribute("href")).toBe("/parents");
  });
});
