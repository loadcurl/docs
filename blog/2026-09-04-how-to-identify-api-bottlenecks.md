---
slug: how-to-identify-api-bottlenecks
title: How to Identify API Bottlenecks
description: "Find API bottlenecks during load tests using latency percentiles, throughput gaps, HTTP errors, and infrastructure signals — a practical debugging checklist."
authors: [loadcurl]
tags:
  - "How-to guides"
  - bottlenecks
  - debugging
  - latency
  - throughput
date: 2026-09-04
---

A load test that “fails” is useful only if you can name the **bottleneck**. Otherwise you are left with a slow PDF and a vague urge to add more servers.

{/* truncate */}

Use the report as a symptom list, then confirm with infrastructure signals.

## Start with four report signals

### 1. Throughput vs target RPS

If achieved RPS stays well below target while the generators are healthy, the **server side is refusing or delaying work** — saturation, rate limits, or connection refusal.

If achieved RPS matches target but latency is terrible, you are successfully delivering pain at the requested rate.

### 2. p95 / p99 shape over time

- **Immediate** high p99 → likely misconfig, cold dependency, or too-high starting RPS
- **Rising** p99 during a hold → queues filling, pools exhausting, GC, lock contention
- **p50 flat, p99 rising** → classic tail saturation

See [What Is p95 and p99 Latency?](/blog/what-is-p95-and-p99-latency).

### 3. HTTP status mix

- **429** — limiter or WAF; may be intentional protection
- **5xx** — application or upstream failure under load
- **Timeouts** — somewhere in the chain exceeded client or gateway budgets

### 4. Successful vs all latency scopes

If successful latency looks fine but “all” looks awful, failures/timeouts dominate the story. Fix errors before chasing micro-optimizations on the happy path.

## Map symptoms to likely layers

| Symptom | Suspect |
|---|---|
| High DB CPU / lock waits | Queries, missing indexes, hot rows |
| Pool wait time up | DB/Redis pool too small vs RPS |
| App CPU pegged | Inefficient code, crypto, serialization |
| App CPU low, latency high | Waiting on downstream I/O |
| LB 5xx / reconnect storms | Upstream crash loops, keep-alive issues |
| Sudden 429s | Gateway or app rate limits |
| Only one instance hot | Bad load balancing or sticky sessions |

## A debugging loop that works

1. **Reproduce** at the lowest RPS that shows the symptom
2. **Capture** report + app/DB dashboards for the same time window
3. **Hypothesize** one layer
4. **Change** one thing (index, pool size, cache, instance count)
5. **Re-run** the same profile and compare PDFs

Do not climb to 10k RPS while debugging a failure that appears at 500.

## Application-level checks

- Slow query logs during the run
- Contended locks or unique constraints on hot keys
- N+1 calls hidden behind one API endpoint
- Oversized payloads and unnecessary JSON work
- Chatty logging or tracing at high RPS

## Dependency checks

Fan-out multiplies load. If one user request triggers four internal calls, your dependency may see far more RPS than the edge. Load test the hotspot and watch the dependency’s saturation metrics.

## Client-side false bottlenecks

Before blaming the API:

- Confirm generators actually reached target RPS
- Rule out laptop/network limits for local tools
- Prefer cloud generators for serious profiles ([comparison](/blog/cloud-based-vs-local-load-testing))

## Using Loadcurl in the loop

Run the same New test profile repeatedly: identical curl, RPS, ramp-up, and duration. Compare latency percentiles, throughput achievement, and HTTP outcomes across PDFs while you change infra. The run page’s polled status helps you see when provisioning vs testing vs report phases occur — useful when correlating with cloud metrics.

Details: [report card docs](/docs/tutorial/report-card).

## Bottleneck anti-patterns

- Scaling app pods when the DB is the limiter
- Raising timeouts to “fix” p99 (hides the queue)
- Disabling rate limits in production to pass a test
- Tuning without a fixed RPS profile for comparison

## Related reading

- [How to Test an API for 10,000 RPS](/blog/how-to-test-an-api-for-10000-requests-per-second)
- [API Performance Testing Best Practices](/blog/api-performance-testing-best-practices)
- [Common Mistakes](/blog/common-api-performance-testing-mistakes)
