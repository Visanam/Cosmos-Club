import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({
  createLead: vi.fn(),
  createStoryComment: vi.fn(),
  listApprovedStoryComments: vi.fn(),
  listPendingStoryComments: vi.fn(),
  reviewStoryComment: vi.fn(),
}));

import { appRouter } from "./routers";
import { createStoryComment, listApprovedStoryComments, listPendingStoryComments, reviewStoryComment } from "./db";

const request = { protocol: "http", headers: {}, get: () => "localhost" } as TrpcContext["req"];
const response = { clearCookie: vi.fn() } as TrpcContext["res"];
const publicContext = { user: null, req: request, res: response } as TrpcContext;
const adminContext = { user: { id: 1, openId: "owner", name: "Owner", email: "owner@example.com", loginMethod: "manus", role: "admin", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: request, res: response } as TrpcContext;

describe("moderated story comments", () => {
  beforeEach(() => vi.clearAllMocks());

  it("stores a new note as the router submission payload", async () => {
    const input = { page: "season-1" as const, displayName: "Ari", message: "This gives us a gentle way to talk about courage together." };
    await expect(appRouter.createCaller(publicContext).comments.submit(input)).resolves.toEqual({ success: true });
    expect(createStoryComment).toHaveBeenCalledWith(input);
  });

  it("allows the owner to review notes and only lists approved notes publicly", async () => {
    vi.mocked(listPendingStoryComments).mockResolvedValue([{ id: 7, page: "season-1", displayName: "Ari", message: "A note", createdAt: new Date() }] as never);
    vi.mocked(listApprovedStoryComments).mockResolvedValue([{ id: 7, displayName: "Ari", message: "A note", createdAt: new Date() }] as never);
    const admin = appRouter.createCaller(adminContext);

    await expect(admin.comments.listPending()).resolves.toHaveLength(1);
    await expect(admin.comments.review({ id: 7, status: "approved" })).resolves.toEqual({ success: true });
    expect(reviewStoryComment).toHaveBeenCalledWith(7, "approved");
    await expect(appRouter.createCaller(publicContext).comments.listPublic({ page: "season-1" })).resolves.toEqual([{ id: 7, displayName: "Ari", message: "A note", createdAt: expect.any(Date) }]);
  });
});
