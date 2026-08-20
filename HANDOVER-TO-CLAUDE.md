# Backend Handover for Frontend Work

## Current backend release: b0.1

The B1 backend exposes one production REST endpoint:

| Method | Path | Success response | Purpose |
|---|---|---|---|
| `GET` | `/api/health` | `200 {"ok":true,"version":"b0.1","db":"up","time":"…"}` | Server and Neon connection smoke test. |

On a database outage, `/api/health` returns `503 {"ok":false,"db":"down"}`. It does not reveal connection details.

The frontend was not modified. Its current tRPC import remains a **compile-only compatibility bridge** while the live backend is REST-only; there is no `/api/trpc` service. No current frontend action is required for B1.

Future frontend work must use the published REST contract from the backend specification. B2 will make `POST /api/leads` live; do not move the current lead forms from Web3Forms until that endpoint is proven and the B2 handover explicitly says it is ready.
