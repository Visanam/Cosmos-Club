import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ParentJourney from "./ParentJourney";

vi.mock("@/components/Seo", () => ({ Seo: () => null }));

describe("ParentJourney", () => {
  beforeEach(() => sessionStorage.clear());
  afterEach(cleanup);

  it("introduces a story-world guide before parents choose an age band", () => {
    render(<ParentJourney />);

    expect(screen.getByText("Sprig’s glow guide")).toBeTruthy();
    expect(screen.getByText(/The story gives the skill a face, a feeling, and a gentle next step/i)).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Who are we making room for/i })).toBeTruthy();
    expect(screen.getByText(/For readers aged 4–12/i)).toBeTruthy();
  });

  it("shows a tangible three-part ritual preview once a parent completes the journey", async () => {
    const user = userEvent.setup();
    render(<ParentJourney />);

    await user.click(screen.getByRole("button", { name: /4–6 years/i }));
    await user.click(screen.getByRole("button", { name: /Continue/i }));
    await user.click(screen.getByRole("button", { name: /Kindness/i }));
    await user.click(screen.getByRole("button", { name: /Continue/i }));
    await user.click(screen.getByRole("button", { name: /Notices a friend who may need help before they ask/i }));
    await user.click(screen.getByRole("button", { name: /Continue/i }));

    expect(screen.getByLabelText(/What your plan gives you tonight/i)).toBeTruthy();
    expect(screen.getByText(/Your family’s gentle starting point/i)).toBeTruthy();
    expect(screen.getByText(/A story doorway/i)).toBeTruthy();
    expect(screen.getByText(/One familiar moment/i)).toBeTruthy();
    expect(screen.getByText(/A gentle next question/i)).toBeTruthy();
  });
});
