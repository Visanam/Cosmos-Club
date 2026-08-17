import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import Characters from "./Characters";
import { FAVORITES_STORAGE_KEY } from "@/lib/favorites";

vi.mock("@/components/Seo", () => ({ Seo: () => null }));
vi.mock("@/components/Reveal", () => ({ Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ open, children }: { open: boolean; children: React.ReactNode }) => open ? <div role="dialog">{children}</div> : null,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
}));

describe("character gallery interactions", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it("reveals the summary on hover, opens a field note, and persists a saved character", async () => {
    const user = userEvent.setup();
    render(<Characters />);
    const neoCard = await screen.findByTestId("character-card-neo");
    const openNeo = screen.getByLabelText("Open Neo's profile");

    fireEvent.mouseEnter(openNeo);
    expect(neoCard.getAttribute("data-summary-visible")).toBe("true");
    expect(openNeo.getAttribute("aria-expanded")).toBe("true");

    await user.click(screen.getByLabelText("Save Neo from your story shelf"));
    expect(window.localStorage.getItem(FAVORITES_STORAGE_KEY)).toContain("neo");
    expect(screen.getByLabelText("Remove Neo from your story shelf").getAttribute("aria-pressed")).toBe("true");

    await user.click(openNeo);
    expect(screen.getByRole("dialog").textContent).toContain("Field note");
    expect(screen.getByRole("dialog").textContent).toContain("Neo");
  });

  it("restores a previously saved character onto the story shelf after a reload", async () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(["sprig"]));
    render(<Characters />);

    const shelf = await screen.findByRole("region", { name: "Your saved character profiles" });
    expect(within(shelf).getByText("Kept close for later")).toBeTruthy();
    expect(within(shelf).getByTestId("shelf-card-sprig")).toBeTruthy();
  });

  it("filters and sorts saved profiles, then opens a print-ready keepsake preview", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(["sprig", "neo"]));
    render(<Characters />);

    await screen.findByTestId("shelf-card-sprig");
    fireEvent.change(screen.getByLabelText("Sort your saved character shelf"), { target: { value: "name" } });
    expect(screen.getAllByTestId(/shelf-card-/)[0]?.getAttribute("data-testid")).toBe("shelf-card-neo");

    fireEvent.change(screen.getByLabelText("Filter your saved character shelf"), { target: { value: "courage" } });
    expect(screen.getByText("No saved friends match this view. Try another filter.")).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Filter your saved character shelf"), { target: { value: "all" } });
    await user.click(within(screen.getByTestId("shelf-card-neo")).getByRole("button", { name: "Print / PDF" }));
    await waitFor(() => expect(open).toHaveBeenCalledWith("/keepsake/neo", "_blank", "noopener,noreferrer"));
    open.mockRestore();
  });
});
