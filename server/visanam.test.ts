import { describe, expect, it } from "vitest";
import { appRouter, storyCommentReviewSchema, storyCommentSchema } from "./routers";
import { makeSeasonOneLineItem } from "./products";
import { buildPlan, characters, getPricingForTimezone, valueOptions } from "../client/src/lib/visanam";
import { toggleFavoriteId } from "../client/src/lib/favorites";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {}, get: () => "visanam.test" } as unknown as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Visanam geo-pricing", () => {
  it("uses the exact specified pricing anchors for India, USA, Singapore, UK, and UAE", () => {
    expect(getPricingForTimezone("Asia/Kolkata").display).toBe("₹3,500");
    expect(getPricingForTimezone("America/New_York").display).toBe("$129");
    expect(getPricingForTimezone("Asia/Singapore").display).toBe("$159");
    expect(getPricingForTimezone("Europe/London").display).toBe("£89");
    expect(getPricingForTimezone("Asia/Dubai").display).toBe("AED 399");
  });

  it("generates Stripe amounts correctly for decimal and zero-decimal currencies", () => {
    expect(makeSeasonOneLineItem("INR", 3500).price_data?.unit_amount).toBe(350000);
    expect(makeSeasonOneLineItem("JPY", 18900).price_data?.unit_amount).toBe(18900);
  });
});

describe("Visanam Parent Insight Journey", () => {
  it("returns a printable plan with questions for the selected child focus", () => {
    const plan = buildPlan("Courage", "Avoids a new activity because it feels scary", "7–9");
    expect(plan.title).toContain("courage");
    expect(plan.questions).toHaveLength(3);
    expect(plan.episodes).toEqual(["05", "06"]);
    expect(plan.outcome).toBe("Confidence to act with uncertainty");
    expect(plan.childPractice.length).toBeGreaterThan(20);
  });

  it("gives every parent-selectable value a concrete skill, everyday moment, and growth rationale", () => {
    expect(valueOptions).toHaveLength(8);
    expect(valueOptions.every((value) => value.outcome.length > 8 && value.childPractice.length > 20 && value.whyItMatters.length > 25 && value.moments.length >= 3)).toBe(true);
  });

  it("rejects an incomplete checkout request before it can create a payment session", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.checkout.createSession({
      parentName: "",
      childNameAge: "Ravi, 7",
      valueFocus: "Courage",
      country: "India",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

describe("Visanam storybook community notes", () => {
  it("accepts a spoiler-safe note shape and constrains it to the public Season 1 page", () => {
    expect(storyCommentSchema.parse({
      page: "season-1",
      displayName: "Riya’s parent",
      message: "We want to talk about how small brave steps can feel at home.",
    })).toMatchObject({ page: "season-1" });
  });

  it("rejects too-short submissions before they can enter the moderation queue", () => {
    expect(() => storyCommentSchema.parse({ page: "season-1", displayName: "A", message: "Hi" })).toThrow();
  });

  it("only permits explicit approval or rejection actions for a valid note id", () => {
    expect(storyCommentReviewSchema.parse({ id: 12, status: "approved" })).toEqual({ id: 12, status: "approved" });
    expect(() => storyCommentReviewSchema.parse({ id: 0, status: "pending" })).toThrow();
  });
});

describe("Visanam character shelf", () => {
  it("adds and removes a saved character id without changing other shelf entries", () => {
    expect(toggleFavoriteId(["neo", "tara"], "sprig")).toEqual(["neo", "tara", "sprig"]);
    expect(toggleFavoriteId(["neo", "tara"], "neo")).toEqual(["tara"]);
  });

  it("provides a concise field-note summary for every character card interaction", () => {
    expect(characters).toHaveLength(6);
    expect(characters.every((character) => character.summary.length > 20)).toBe(true);
  });
});
