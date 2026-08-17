import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import React from "react";

const joyrideCalls: Array<Record<string, unknown>> = [];

vi.mock("react-joyride", () => ({
  Joyride: (props: Record<string, unknown>) => {
    joyrideCalls.push(props);
    return <button type="button" onClick={() => (props.onEvent as (event: { status: string }) => void)({ status: "finished" })}>Finish tour</button>;
  },
  STATUS: { FINISHED: "finished", SKIPPED: "skipped" },
}));

import { lessonTourSteps, ParentValuesTour } from "./ParentValuesTour";

describe("ParentValuesTour", () => {
  it("uses the moral-lesson panel for its optional lesson walkthrough and closes when completed", () => {
    const onComplete = vi.fn();
    render(<ParentValuesTour run mode="lessons" onComplete={onComplete} />);

    expect(lessonTourSteps[0]).toMatchObject({ target: "[data-tour='moral-lesson-tag']" });
    expect((joyrideCalls[0].steps as Array<{ target: string }>)[0].target).toBe("[data-tour='moral-lesson-tag']");
    fireEvent.click(screen.getByRole("button", { name: "Finish tour" }));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
