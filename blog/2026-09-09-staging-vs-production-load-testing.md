---
slug: staging-vs-production-load-testing
title: "Staging vs Production Load Testing: When Each Is Safe"
description: "When to load test staging vs production, how domain verification fits, ramp-up and abort criteria, and how to run a production game day safely."
authors: [loadcurl]
tags:
  - "How-to guides"
  - staging
  - production
  - safety
  - load testing
date: 2026-09-09
---

Traffic from a load test is **real**. Generators open connections, hit auth, touch databases, and trip rate limits. Choosing staging vs production is a safety decision first — a metrics decision second.

{/* truncate */}

## Default: staging

Use staging when you want to answer:

- Can we sustain target RPS?
- Do p95/p99 stay inside SLOs?
- What breaks first as we climb the ladder?

**Requirements for useful staging:**

- Sized similarly to production (or known scale factor)
- Realistic data shapes and auth paths
- Observability (CPU, DB, queues, errors)
- A hostname you can **verify** in Loadcurl

Verify `staging.example.com` (or the staging apex) under **Domains**, then run New test against that host only.

## When production load testing can be justified

Production game days make sense when:

- Staging cannot reproduce production dependencies or traffic paths
- You need to validate autoscaling, CDN, or edge behavior for real
- The business accepts controlled risk with on-call coverage

Treat it as an **incident rehearsal**, not a casual click of Start.

## Production rules of engagement

1. **Permission** — only systems you own / are allowed to test
2. **Domain verification** — proves control; does not make load “safe”
3. **Modest RPS first** — climb a ladder; do not jump to peak
4. **Ramp-up** — avoid cliff-edge traffic from RPS = 0
5. **Abort criteria** — max error rate, max p99, customer impact signals
6. **On-call + observability** — dashboards open before Start
7. **Off-peak window** — unless the goal is peak-hour realism
8. **Stop early** — Loadcurl can stop a live run and release unused quota hold

## Staging pitfalls that create false confidence

- Tiny staging DB that never saturates like prod
- Disabled rate limits or auth shortcuts
- Synthetic payloads that skip hot queries
- No cache warming difference documented

Document gaps so nobody claims “staging survived 2k RPS” as a production guarantee without a scale factor.

## How Loadcurl enforces a baseline of responsibility

- Only **verified** hosts (or their subdomains) can be targeted
- Personal: 1 domain; company: up to 10 (handy for staging + API + app)
- Quota hold `duration × RPS` limits accidental multi-hour blasts without plan capacity

Still: **you** choose the URL and the RPS. Prefer staging in the composer by default.

## Decision cheat sheet

| Goal | Environment |
|---|---|
| Feature capacity / regression | Staging |
| Find breaking point (stress) | Staging |
| Autoscale / multi-AZ realism | Production game day |
| Marketing “we tested prod at peak” | Only with formal game day |

## Related reading

- [How to Verify a Domain for Load Testing](/blog/how-to-verify-a-domain-for-load-testing)
- [What Is Ramp-Up in Load Testing?](/blog/what-is-ramp-up-in-load-testing)
- [Pre-Launch Load Testing Checklist](/blog/pre-launch-load-testing-checklist)
- [Loadcurl FAQ](/docs/tutorial/faq)
