---
slug: smoke-vs-load-vs-soak-testing-for-apis
title: Smoke Test vs Load Test vs Soak Test for APIs
description: "Know when to run API smoke, load, and soak tests — different RPS, duration, and questions — and how to configure each profile in practice."
authors: [loadcurl]
tags:
  - Fundamentals
  - smoke test
  - soak test
  - load test
date: 2026-09-14
---

Not every performance run should be a peak-RPS rehearsal. **Smoke**, **load**, and **soak** answer different questions — and should use different duration and quota budgets.

{/* truncate */}

## Smoke test

**Question:** Does the path work under a little traffic?

- Low RPS (often 5–20)
- Short duration (1–3 minutes)
- Ramp-up optional / small
- Watch for 4xx/5xx and obvious timeouts

Use after changing the Postman/curl request, auth headers, or domain — before spending a large `duration × RPS` hold.

## Load test

**Question:** Can we sustain **expected peak** with acceptable p95/p99 and errors?

- Target RPS from traffic math
- Minutes-long hold after ramp-up
- Pass/fail criteria written first

This is Loadcurl’s default job: target RPS, ramp-up, duration, then a report. See [Load vs Stress vs Performance Testing](/blog/load-testing-vs-stress-testing-vs-performance-testing).

## Soak (endurance) test

**Question:** Does performance **drift** over time — leaks, saturation, disk, connection exhaustion?

- Moderate RPS (often below peak)
- Long duration (tens of minutes to hours — within plan max duration)
- Watch p99 and error rate **over time**, not only averages

Soak is still a load profile — same composer — with different intent and patience. Check quota hold first; long × RPS gets expensive.

## Stress (for contrast)

**Question:** Where does it break above peak? Prefer staging. Not the same as soak or smoke.

## Quick comparison

| Type | RPS | Duration | Primary signal |
|---|---|---|---|
| Smoke | Low | Short | Correctness |
| Load | Expected peak | Minutes | SLO at peak |
| Soak | Moderate | Long | Drift / leaks |
| Stress | Above peak | Until degrade | Breaking point |

## Suggested Loadcurl sequences

1. Smoke at 10 RPS × 120s
2. Load at target × 600s with 60s ramp-up
3. Optional soak at 50% peak × as long as plan + quota allow
4. Optional stress on staging only

Stop early if the smoke fails — do not burn Growth-plan quota on a bad Authorization header.

## Related reading

- [What Is Ramp-Up in Load Testing?](/blog/what-is-ramp-up-in-load-testing)
- [Request Quota Explained](/blog/request-quota-explained-duration-times-rps)
- [Pre-Launch Checklist](/blog/pre-launch-load-testing-checklist)
