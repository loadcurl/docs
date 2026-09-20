---
slug: how-to-calculate-rps-for-api-load-testing
title: How to Calculate RPS for API Load Testing
description: "Learn how to estimate target requests per second for API load tests using traffic data, concurrency, and peak factors — with safe starting profiles."
authors: [loadcurl]
tags:
  - "Metrics & SLOs"
  - RPS
  - capacity
  - API load testing
date: 2026-08-29
---

**RPS** (requests per second) is the primary dial in API load testing. Pick it too low and you learn nothing. Pick it too high and you burn quota — or take down a shared staging environment.

{/* truncate */}

Here is a practical way to calculate a target RPS before you hit Start.

## Start from real traffic when you can

If you have production or staging metrics:

1. Find peak requests / minute for the endpoint (or service)
2. Convert to RPS: `peak_per_minute / 60`
3. Apply a **headroom factor** for launch or campaign risk (often 1.5×–3×)

Example: checkout peaks at 9,000 requests/minute → 150 RPS. For a Black Friday rehearsal you might test at **300 RPS** (2×).

## When you do not have metrics yet

Estimate from product assumptions:

```
daily_active_users × actions_per_user_per_day
─────────────────────────────────────────────
seconds_in_day × fraction_of_traffic_on_endpoint
```

Then concentrate that into a peak window. If 40% of daily API calls land in a 2-hour evening rush:

```
peak_rps ≈ (daily_endpoint_calls × 0.40) / (2 × 3600)
```

Round up, then add headroom. Document the assumptions so later runs stay comparable.

## Concurrency is not RPS

Engineers sometimes confuse concurrent users with RPS.

Rough relationship:

```
RPS ≈ concurrency / average_latency_seconds
```

If 100 clients each wait ~200 ms for a response, sustained RPS is near `100 / 0.2 = 500` only if they immediately retry. In practice think in **arrival rate** (RPS), not open browser tabs.

Loadcurl configures **target RPS**, not “virtual users,” which maps cleanly to API capacity planning.

## Account for the full path

Your endpoint RPS is not the only load on the system. Include:

- Auth / token refresh calls
- Fan-out to internal services
- Webhooks or async workers triggered by the request
- Health checks and mesh sidecar traffic (if relevant)

If one user action fires 4 HTTP calls, a “100 RPS user journey” might mean **400 RPS** at the edge — or 100 RPS on one hotspot dependency.

## Ramp-up and duration change the story

Target RPS alone is incomplete. Also choose:

- **Ramp-up** — seconds from 0 → target (avoids false failures from cold caches)
- **Duration** — long enough to exit warmup; often 3–15 minutes for load tests

A 30-second blast at 1,000 RPS tests a different failure mode than 10 minutes at 200 RPS.

## Quota-aware planning

In Loadcurl, starting a run places a hold of roughly **duration × RPS** against monthly request quota. Before a large rehearsal:

1. Estimate hold size: `600 seconds × 200 RPS = 120,000 requests`
2. Confirm available quota on Usage
3. Prefer staging hosts you have verified

See [billing docs](/docs/tutorial/billing) for how allotted / available / held / used work.

## A safe ladder

Do not jump straight to peak:

1. **Smoke** — 5–10 RPS, 1–2 minutes
2. **Baseline** — 25–50% of target
3. **Target load** — expected peak
4. **Optional stress** — above peak on staging only

Compare p95/p99 and error rates between steps.

## Example profile

Goal: validate a public read API for a product launch expecting ~120 RPS peak.

- Target RPS: **150** (≈1.25×)
- Ramp-up: **60** seconds
- Duration: **600** seconds
- Pass criteria: p95 < 200 ms on successful responses, errors < 0.5%

Compose the GET (or paste curl), verify the domain, start the run, then iterate from the report.

## Next steps

- [How to Test an API for 10,000 Requests Per Second](/blog/how-to-test-an-api-for-10000-requests-per-second)
- [API Performance Testing Best Practices](/blog/api-performance-testing-best-practices)
- [Getting started with Loadcurl](/docs/tutorial/getting-started)
