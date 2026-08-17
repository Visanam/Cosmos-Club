import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StorybookComments } from "./StorybookComments";

const trpcMocks = vi.hoisted(() => ({
  listPublic: vi.fn(),
  submit: vi.fn(),
  mutate: vi.fn(),
  invalidate: vi.fn(),
  mutationOptions: null as { onSuccess?: () => void } | null,
}));

vi.mock("@/components/Reveal", () => ({ Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    useUtils: () => ({ comments: { listPublic: { invalidate: trpcMocks.invalidate } } }),
    comments: {
      listPublic: { useQuery: trpcMocks.listPublic },
      submit: { useMutation: trpcMocks.submit },
    },
  },
}));

describe("storybook lantern notes", () => {
  beforeEach(() => {
    trpcMocks.mutate.mockReset();
    trpcMocks.invalidate.mockReset();
    trpcMocks.listPublic.mockReturnValue({ isLoading: false, data: [] });
    trpcMocks.mutationOptions = null;
    trpcMocks.submit.mockImplementation((options) => {
      trpcMocks.mutationOptions = options;
      return { mutate: trpcMocks.mutate, isPending: false };
    });
  });
  afterEach(cleanup);

  it("submits a reader note into the moderated review flow", async () => {
    const user = userEvent.setup();
    render(<StorybookComments />);
    await user.type(screen.getByLabelText("First name or nickname only"), "Aanya’s mum");
    await user.type(screen.getByLabelText("What did this glimpse make you want to talk about?"), "We are going to talk about brave choices after dinner.");
    await user.click(screen.getByRole("button", { name: /send lantern note/i }));

    expect(trpcMocks.mutate).toHaveBeenCalledWith({
      page: "season-1",
      displayName: "Aanya’s mum",
      message: "We are going to talk about brave choices after dinner.",
    });
    expect(screen.getByText("Reviewed voices only")).toBeTruthy();
  });

  it("shows an approved reader note in the public community wall", () => {
    trpcMocks.listPublic.mockReturnValue({
      isLoading: false,
      data: [{ id: 3, displayName: "Sam’s dad", message: "We used the bridge idea to practise listening.", createdAt: new Date("2026-08-17T00:00:00.000Z") }],
    });
    render(<StorybookComments />);

    expect(screen.getByText(/We used the bridge idea to practise listening/)).toBeTruthy();
    expect(screen.getByText("Sam’s dad")).toBeTruthy();
    expect(screen.getByText("Reviewed voices only")).toBeTruthy();
  });

  it("shows the sending state and a clear review acknowledgement after submission", async () => {
    trpcMocks.submit.mockReturnValue({ mutate: trpcMocks.mutate, isPending: true });
    render(<StorybookComments />);
    expect(screen.getByRole("button", { name: /sending your lantern/i })).toBeTruthy();

    cleanup();
    trpcMocks.submit.mockImplementation((options) => {
      trpcMocks.mutationOptions = options;
      return { mutate: trpcMocks.mutate, isPending: false };
    });
    const user = userEvent.setup();
    render(<StorybookComments />);
    await user.type(screen.getByLabelText("First name or nickname only"), "Ravi");
    await user.type(screen.getByLabelText("What did this glimpse make you want to talk about?"), "We will take a calm pause before bedtime.");
    await user.click(screen.getByRole("button", { name: /send lantern note/i }));
    await act(async () => { trpcMocks.mutationOptions?.onSuccess?.(); });

    expect(screen.getByText(/Your lantern is glowing with the storykeepers/)).toBeTruthy();
  });
});
