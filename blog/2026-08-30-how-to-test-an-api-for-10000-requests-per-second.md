---
slug: how-to-test-an-api-for-10000-requests-per-second
title: "How to Test an API for 10,000 Requests Per Second"
description: "A practical playbook for approaching 10k RPS API load tests: capacity math, staging safety, ramp strategies, bottlenecks, and cloud generators."
authors: [loadcurl]
tags:
  - "How-to guides"
  - high RPS
  - scalability
  - API performance
date: 2026-08-30
---

**10,000 RPS** is a serious load profile. Many APIs never need it; some need it only for a short peak. Either way, you do not get there by typing `10000` into a tool on day one.

{/* truncate */}

This guide is a playbook: prepare the system, climb in steps, and read the right signals.

## Confirm you actually need 10k RPS

Translate business peaks into RPS (see [How to Calculate RPS](/blog/how-to-calculate-rps-for-api-load-testing)). Often “we need 10k” means:

- 10k RPS across **many** endpoints combined
- 10k RPS at a CDN/edge, not at the origin API
- A short spike, not a sustained plateau

If origin peak is 800 RPS, a 1k–2k load test may be enough. Save 10k runs for systems sized for that traffic.

## Prerequisites before high RPS

- **Staging that mirrors production** — similar instance sizes, DB, caches, and auth paths
- **Permission** — only hosts you own / are allowed to test; verify the domain
- **Observability** — CPU, memory, DB connections, queue depth, error rates, and saturation alerts
- **Abort criteria** — max error rate, max p99, or on-call signal to stop
- **Quota and cost** — `duration × RPS` grows fast (e.g. 300s × 10,000 = 3,000,000 requests held)

Prefer cloud generators when your laptop cannot open enough connections or when you need isolation from office Wi‑Fi. See [Cloud-Based vs Local Load Testing](/blog/cloud-based-vs-local-load-testing).

## Climb a ladder, do not cliff-jump

Example ladder toward 10k:

1. 100 RPS × 3 min — smoke
2. 500 RPS × 5 min — baseline
3. 1,000 RPS × 5–10 min
4. 2,500 RPS × 5–10 min
5. 5,000 RPS × 5–10 min
6. 7,500 RPS
7. 10,000 RPS

At each step, record p50/p95/p99 (successful vs all), throughput vs target, and 4xx/5xx/timeouts. Stop when you miss SLOs — then fix bottlenecks before climbing again.

Use **ramp-up** (often 60–180 seconds at higher steps) so autoscalers and connection pools can warm.

## Design the request carefully

At 10k RPS, tiny mistakes amplify:

- Cache-busting query params that defeat CDN/app caches unintentionally
- Unique writes that saturate a single DB shard
- Heavy auth introspection on every call
- Payloads that are larger than production

Match production headers, auth style, and body shape. Keep each Loadcurl test to **one HTTP request** under a load profile — isolate the hottest endpoint first.

## What usually breaks first

- **Application connection pools** to DB or Redis
- **Database CPU / locks / slow queries**
- **TLS and keep-alive settings** on reverse proxies
- **Rate limiters** you forgot were lower than the target
- **Logging / APM overhead** under extreme chatty traces
- **Downstream dependencies** with smaller capacity than the edge

Use [How to Identify API Bottlenecks](/blog/how-to-identify-api-bottlenecks) as a checklist while the run is live.

## Interpreting a 10k report

Do not celebrate hitting target RPS alone. Ask:

- Was achieved throughput close to target for most of the run?
- Did p99 explode while p50 looked fine?
- Did timeouts rise late in the run (saturation) or immediately (misconfig)?
- Did 429s appear — expected protection or accidental throttle?

Export a PDF and compare against the previous step on the ladder.

## Safety notes

- Prefer staging; production 10k RPS is an incident waiting to happen unless it is a planned game day
- Coordinate with infra and on-call
- Domain verification is an ownership gate, not a safety guarantee
- Stop early if abort criteria trip

## Running high RPS with Loadcurl

In [Loadcurl](https://app.loadcurl.com):

1. Verify the hostname under Domains
2. Open New test — paste curl / Postman or fill the composer
3. Set target RPS, ramp-up, and duration within plan caps
4. Confirm quota hold (`duration × RPS`) on Usage
5. Start, watch polled live status, then read the report

Plan limits may cap max RPS — upgrade or split scenarios if you need more headroom. Docs: [domains](/docs/tutorial/domains), [report card](/docs/tutorial/report-card).
