---
slug: what-is-ramp-up-in-load-testing
title: "What Is Ramp-Up in Load Testing?"
description: "Learn what ramp-up means in API load testing, how it differs from duration and target RPS, and how to choose ramp-up seconds in Loadcurl."
authors: [loadcurl]
tags:
  - Fundamentals
  - "ramp-up"
  - RPS
  - load profile
date: 2026-09-10
---

**Ramp-up** is the time your load test spends climbing from little or no traffic to the **target RPS**. It is one of three core knobs in an HTTP load profile — alongside target RPS and duration.

{/* truncate */}

In Loadcurl, ramp-up is configured in **seconds**. `0` means start at full target RPS immediately.

## The three knobs

| Knob | Meaning |
|---|---|
| **Target RPS** | Peak requests per second you want to reach |
| **Ramp-up** | Seconds to go from 0 → target |
| **Duration** | Total length of the run (seconds) |

Example: duration 600s, ramp-up 60s, target 200 RPS → roughly one minute of climb, then about nine minutes near peak (exact shape depends on the generator schedule).

## Why ramp-up matters

Starting at full blast mixes different failure modes:

- Cold caches and empty connection pools
- Autoscalers still waking up
- JIT / runtime warmup
- Sudden lock or queue shocks

A short ramp-up lets the system enter a steady state so **p95/p99 during the hold** reflect capacity — not just cold-start drama.

## Choosing a ramp-up

Practical starting points:

- **Smoke / debug:** 0–15 seconds
- **Normal load test:** 30–120 seconds
- **Higher RPS or autoscale validation:** 60–180+ seconds

If your pass criteria care about steady-state latency, either use a non-zero ramp-up or **ignore the first portion** of the run when comparing percentiles.

## Ramp-up is not duration

Teams sometimes set a long duration and forget ramp-up — or set ramp-up equal to duration and never reach a stable hold. Prefer:

1. Enough ramp to warm
2. Enough remaining duration to measure at target RPS

See [How Many Requests Do I Need for a Meaningful Load Test?](/blog/how-many-requests-for-a-meaningful-load-test).

## Quota impact

Loadcurl still places a hold of roughly **`duration × RPS`** when you start (minimum 1). Ramp-up does not shrink that reservation formula — plan Usage accordingly.

## Common mistakes

- Ramp-up `0` on a production game day
- Comparing p99 from a zero-ramp run to a 2-minute-ramp run without noting the difference
- Ramp longer than the whole test, leaving no steady hold

## In the product

On **New test**, set duration, ramp-up, and target RPS (capped by plan). Paste curl / Postman or fill the composer, verify the domain, then start.

Docs: [Getting started](/docs/tutorial/getting-started) · [Core concepts](/docs/tutorial/intro)
