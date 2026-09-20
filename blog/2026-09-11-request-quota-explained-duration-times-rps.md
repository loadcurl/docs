---
slug: request-quota-explained-duration-times-rps
title: "Request Quota Explained: Why duration × RPS Matters"
description: "Understand Loadcurl request quota — allotted, available, held, used — and why starting a test reserves duration × RPS until the run settles."
authors: [loadcurl]
tags:
  - "Metrics & SLOs"
  - quota
  - billing
  - RPS
  - usage
date: 2026-09-11
---

Loadcurl gates usage with **request quota** on the current workspace plan — not a separate credit pack. The number that surprises people most is the start hold:

{/* truncate */}

> **Hold ≈ duration (seconds) × target RPS** (minimum **1**)

Understanding that formula prevents failed starts and “where did my quota go?” moments.

## The four quota buckets

| Bucket | Meaning |
|---|---|
| **Allotted** | Requests granted for this billing period |
| **Used** | Consumed by settled tests |
| **Held** | Reserved for runs that started but have not settled |
| **Available** | What you can still reserve for a new test |

You see the same wallet on the header **quota chip**, **Dashboard**, and **Usage** (`/wallet`). **Plan** (`/billing`) is where you recharge or upgrade via Razorpay.

## Why multiply duration × RPS?

A test configured for **200 RPS** over **600 seconds** can attempt up to about **120,000** requests. Loadcurl **holds** that amount up front so two teammates cannot over-commit the same monthly pool.

If **available** is too low, start is blocked and you get an insufficient quota error.

## What happens after the run?

- When the report is ready, **actual hits are consumed** and unused hold is **returned**
- **Stop** on a live run (or a failed run without a usable report) **releases** the hold
- Hold states you may see on the run page: Reserved / Consumed / Returned (HELD, SETTLED, or RELEASED)

## Worked examples

| Duration | RPS | Hold |
|---|---|---|
| 60s | 10 | 600 |
| 300s | 100 | 30,000 |
| 600s | 200 | 120,000 |
| 120s | 1,000 | 120,000 |

Smoke tests are cheap. Launch rehearsals are not — check **Usage** first.

## What quota is not

- Not a substitute for **max RPS** and **max duration** plan caps on the composer
- Not carried over when the billing period ends — unused requests expire
- Not per-user in a company workspace — the **team shares one pool**

Personal quota stays in the personal workspace until you convert to a company.

## Practical tips

1. Estimate hold before Start: `duration × RPS`
2. Prefer shorter smokes while debugging the request shape
3. Stop early if the run is clearly invalid — release unused hold
4. Recharge or upgrade on **Plan** when Available is tight
5. Members can view Usage; **Owner/Admin** check out

## Related reading

- [How Many Requests for a Meaningful Load Test?](/blog/how-many-requests-for-a-meaningful-load-test)
- [Personal vs Team Workspace](/blog/personal-vs-team-workspace-for-load-testing)
- [Plan and usage docs](/docs/tutorial/billing)
