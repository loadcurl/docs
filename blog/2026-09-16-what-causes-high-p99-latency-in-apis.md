---
slug: what-causes-high-p99-latency-in-apis
title: "What Causes High p99 Latency in APIs?"
description: "Common causes of high API p99 latency under load — queues, pools, GC, locks, dependencies — and how to confirm them with load-test reports."
authors: [loadcurl]
tags:
  - "Metrics & SLOs"
  - p99
  - latency
  - bottlenecks
date: 2026-09-16
---

When **p99** blows up while **p50** looks fine, a small fraction of requests are stuck in queues, locks, or slow dependencies. That fraction is often what users and retries feel.

{/* truncate */}

## What p99 is telling you

p99 is the latency threshold that 99% of requests beat. Spikes usually mean **queueing delay** or **occasional expensive work**, not that every request got slower.

Pair it with error/timeout rates and successful-vs-all scopes in the report.

## Frequent root causes

### 1. Thread / connection pool saturation

Requests wait for a DB, Redis, or HTTP client connection. CPU may look calm while p99 climbs.

### 2. Database locks and hot rows

Contended updates, missing indexes, or single-row hotspots create long tails under RPS.

### 3. Garbage collection and runtime pauses

Language runtimes under allocation pressure add multi-hundred-millisecond stalls visible at p99 before p50 moves.

### 4. Downstream dependency latency

Your handler is “fine” but a billing, search, or auth dependency saturates. Fan-out multiplies the effect.

### 5. Synchronous logging / tracing overload

Chatty logs or heavy trace export at high RPS steal tail latency.

### 6. Cold path vs warm path

Cache misses, first-request JIT, or per-tenant cold starts create rare slow calls — classic p99 fuel.

### 7. Retries amplifying load

Client timeouts trigger retries, which raise RPS and create more timeouts — a feedback loop.

## How a load report points the way

In Loadcurl-style reports:

- **p50 flat, p99 rising during hold** → saturation building
- **Achieved RPS below target** → system cannot accept work fast enough
- **Timeouts up** → somewhere exceeded budgets
- **5xx up** → hard failures, not just slowness
- **Successful p99 OK, all p99 bad** → failures dominate the mixed distribution

Then confirm with DB pool metrics, lock times, and dependency dashboards. Playbook: [How to Identify API Bottlenecks](/blog/how-to-identify-api-bottlenecks).

## What usually does *not* fix p99

- Raising timeouts (hides queueing)
- Adding app replicas when the DB is the limiter
- Averaging away the tail in executive slides

## Related reading

- [What Is p95 and p99 Latency?](/blog/what-is-p95-and-p99-latency)
- [How to Set Latency SLOs](/blog/how-to-set-latency-slos-for-an-http-api)
- [Report docs](/docs/tutorial/report-card)
