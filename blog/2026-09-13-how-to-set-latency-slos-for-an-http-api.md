---
slug: how-to-set-latency-slos-for-an-http-api
title: How to Set Latency SLOs for an HTTP API
description: "Set practical HTTP API latency SLOs using p95 and p99, tie them to load-test pass criteria, and avoid averages that hide user pain."
authors: [loadcurl]
tags:
  - "Metrics & SLOs"
  - SLO
  - latency
  - p95
  - p99
date: 2026-09-13
---

An SLO turns “the API should feel fast” into a number you can test. For HTTP APIs, that number should almost always be a **latency percentile under a defined load** — not an average from a quiet afternoon.

{/* truncate */}

## Pick the user-visible interaction

Examples:

- `POST /checkout` p95 < 300 ms at 150 RPS
- `GET /search` p99 < 500 ms at 400 RPS
- Auth token exchange p95 < 150 ms at expected peak

Write the **endpoint**, **percentile**, **threshold**, and **RPS context** together. An SLO without a load context is incomplete.

## Prefer p95 or p99 over the mean

Averages hide tails. Clients abandon and retry on the tail. Background: [What Is p95 and p99 Latency?](/blog/what-is-p95-and-p99-latency).

Common patterns:

- **User-facing read APIs:** p95
- **Payments / auth / fan-out critical paths:** p99
- **Internal mesh hops:** tighter budgets so end-to-end still fits

## Separate correctness from speed

A latency SLO should sit next to an **availability / error** objective:

- Success rate ≥ 99.5% at the same RPS profile
- Timeout rate under a small budget

Fast 500s are not success. Loadcurl reports make you look at both status mix and percentiles.

## Derive thresholds from product reality

Sources, in order of honesty:

1. Current production percentiles at known RPS (APM)
2. Competitor/UX research budgets
3. Dependency math (your p99 must fit inside the caller’s timeout)

Then add headroom for regressions. Do not invent “50 ms p99 at 10k RPS” if production never saw that load.

## Turn SLOs into load-test pass criteria

Before Start in Loadcurl:

> Duration 600s, ramp-up 60s, target 150 RPS. Pass if successful p95 < 300 ms, errors < 0.5%, average RPS within 10% of target.

After the run, read the report scopes (**successful** vs **all**) so timeouts do not silently invent a fake p99. Guide: [How to Read an API Load Test Report](/blog/how-to-read-an-api-load-test-report).

## Keep SLOs testable

- One primary percentile per endpoint
- Same load profile when comparing releases
- Document staging vs production scale factor
- Re-run after risky deploys; attach PDF

## Anti-patterns

- SLO on average latency only
- SLO without RPS or concurrency context
- Tightening timeouts instead of fixing queues
- Different payloads every run so trends are meaningless

## Related reading

- [API Performance Testing Best Practices](/blog/api-performance-testing-best-practices)
- [How to Identify API Bottlenecks](/blog/how-to-identify-api-bottlenecks)
- [Tests and reports docs](/docs/tutorial/report-card)
