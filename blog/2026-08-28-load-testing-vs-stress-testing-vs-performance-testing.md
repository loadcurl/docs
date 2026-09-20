---
slug: load-testing-vs-stress-testing-vs-performance-testing
title: Load Testing vs Stress Testing vs Performance Testing
description: "Clear definitions of load, stress, and performance testing for APIs — when to use each, what metrics matter, and how to design safe test profiles."
authors: [loadcurl]
tags:
  - Fundamentals
  - load testing
  - stress testing
  - performance testing
date: 2026-08-28
---

Teams often use “load test,” “stress test,” and “performance test” interchangeably. They overlap, but the **intent** of each run is different — and that intent should drive RPS, duration, and how you interpret the report.

{/* truncate */}

## Performance testing (the umbrella)

**Performance testing** is the broad category: any experiment that measures speed, capacity, or stability under a defined workload.

It includes load tests, stress tests, soak/endurance tests, spike tests, and scalability checks. If someone says “we need performance testing before launch,” ask which question they need answered.

## Load testing

**Load testing** checks behavior under **expected or planned peak** traffic.

Example goals:

- Can checkout sustain 150 RPS for 15 minutes?
- Does p95 stay under 250 ms at that rate?
- Do error rates remain acceptable?

You are validating capacity against a **known target**, not hunting for the breaking point. Ramp up to the target RPS, hold it, and watch latency plus HTTP outcomes.

This is the most common pre-launch API test — and the profile [Loadcurl](https://loadcurl.com) is built around: target RPS, ramp-up, and duration against a single HTTP request.

## Stress testing

**Stress testing** pushes the system **beyond** normal peaks to find limits and failure modes.

Example goals:

- At what RPS do we start returning 5xx or timing out?
- Does the service recover when load drops?
- Do we degrade gracefully (429s, queueing) or collapse?

Stress tests are intentionally aggressive. Use staging, clear abort criteria, and observers on CPU, memory, DB connections, and error budgets. Never treat a stress test as “just another load test” on production.

## How they relate

Think of a spectrum:

1. **Baseline** — light RPS to establish healthy latency
2. **Load** — expected peak, hold for a realistic window
3. **Stress** — above peak until degradation appears
4. **Soak** — moderate load for hours to catch leaks and saturation

All of these are performance tests. Only some are load tests.

## Metrics that matter for each

| Goal | Emphasize |
|---|---|
| Load | Throughput vs target RPS, p95/p99, error rate |
| Stress | Breaking point, recovery time, failure shape |
| Soak | Drift over time, memory, connection leaks |
| Spike | Behavior under sudden RPS jumps |

Always separate successful latency from “all requests” latency. Timeouts and 5xx can distort averages if you mix scopes carelessly — see [What Is p95 and p99 Latency?](/blog/what-is-p95-and-p99-latency).

## Choosing the right test this week

- **Shipping a feature?** Run a load test at expected peak.
- **Capacity planning?** Load at peak, then a controlled stress above it.
- **Incident follow-up?** Reproduce the spike profile that caused pain.
- **New infra?** Baseline → load → short stress, compare reports.

## Practical tips for API teams

- Change one variable between runs so diffs are meaningful
- Prefer staging with production-like data shapes
- Use ramp-up; cold starts and empty connection pools skew early seconds
- Document the pass criteria before you start
- Export reports (PDF) so product and infra can review the same numbers

## How Loadcurl fits

Loadcurl runs HTTP load profiles from the browser: verify a host, compose the request, set RPS / ramp-up / duration, then read latency and throughput in the report. That covers the load-testing workflow most teams need day to day. Stress and soak are the same mechanics with different targets and durations — keep those on systems you are allowed to push hard.

Read more in the [report card docs](/docs/tutorial/report-card).
