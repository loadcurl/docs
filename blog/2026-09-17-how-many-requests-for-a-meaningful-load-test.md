---
slug: how-many-requests-for-a-meaningful-load-test
title: "How Many Requests Do I Need for a Meaningful Load Test?"
description: "Estimate how many total requests make a load test meaningful using duration × RPS, warmup, percentile stability, and Loadcurl quota holds."
authors: [loadcurl]
tags:
  - "Metrics & SLOs"
  - RPS
  - duration
  - quota
  - planning
date: 2026-09-17
---

People ask “how many requests?” when they mean “how long and how hard should I run?” In RPS-based tools the honest answer is:

{/* truncate */}

> **Total attempt budget ≈ duration × target RPS**

Plus enough **steady-state time after ramp-up** for percentiles to mean something.

## The budget formula

Loadcurl holds **`duration × RPS`** (minimum 1) at start. Examples:

| Goal | Example profile | Approx. hold |
|---|---|---|
| Smoke | 10 RPS × 120s | 1,200 |
| Standard load | 150 RPS × 600s | 90,000 |
| Heavier rehearsal | 300 RPS × 900s | 270,000 |

Check **Usage** before you click Start.

## Why short runs mislead

A 20-second blast may never leave warmup. p99 from a few hundred requests is noisy — especially with ramp-up `0`.

Rules of thumb:

- Prefer **several minutes** at target RPS for load SLOs
- Use ramp-up so the hold window is mostly steady
- Re-run once if the first report looks like a cold-start artifact

## Percentiles need samples

Rough intuition: to talk about p99 with any confidence, you want **thousands** of successful requests in the measurement window — not dozens. Higher RPS reaches that sooner; lower RPS needs more duration.

## Separate smoke from proof

| Intent | Requests mindset |
|---|---|
| Prove curl/auth works | Hundreds are enough |
| Prove SLO at peak | Tens of thousands+ often |
| Soak for leaks | High total count over long time at moderate RPS |

Do not spend a Scale-plan hold debugging a wrong header — smoke first.

## Plan caps still apply

Quota is one limit. **Max RPS** and **max duration** on your plan also cap the composer. Free plans intentionally keep rehearsals smaller.

## Practical recipe

1. Smoke: ~1k–2k request hold
2. Baseline: ~25–50% of peak for 5 minutes
3. Peak load: full target for 10 minutes with ramp-up
4. Compare PDFs; only then consider stress/soak

Details on holds: [Request Quota Explained](/blog/request-quota-explained-duration-times-rps) · [Billing docs](/docs/tutorial/billing)
