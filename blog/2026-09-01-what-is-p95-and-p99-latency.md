---
slug: what-is-p95-and-p99-latency
title: "What Is p95 and p99 Latency?"
description: "Understand p50, p95, and p99 latency percentiles for API load testing — why averages lie, how tails form, and how to read them in a load test report."
authors: [loadcurl]
tags:
  - "Metrics & SLOs"
  - latency
  - p95
  - p99
  - SLOs
date: 2026-09-01
---

When an API load test finishes, latency numbers dominate the conversation. **p95** and **p99** are the ones that matter for user experience and SLOs — yet they are easy to misread.

{/* truncate */}

## Percentiles in one sentence

If you sort all request latencies from fastest to slowest:

- **p50** (median) — half of requests were faster than this
- **p95** — 95% were faster; only 5% were slower
- **p99** — 99% were faster; only 1% were slower

So a p95 of 200 ms means **most** traffic finished within 200 ms, while a small slice took longer.

## Why averages fail

Suppose 99 requests take 50 ms and one takes 5,000 ms. The average is ~100 ms — sounds fine. The p99 is 5,000 ms — clients are timing out.

Retries make this worse: slow calls spawn more calls, which raise load and create more slow calls.

## Which percentile should you SLO on?

Common patterns:

- **User-facing APIs:** p95 or p99 against a budget (e.g. p95 < 300 ms)
- **Internal high-QPS services:** often p99, because rare stalls still cascade
- **Batch / async:** sometimes p95 is enough

Pick one primary percentile and stick to it across reports so trends are comparable.

## Successful vs all requests

A subtle trap: including timeouts and failed calls in the same latency distribution as successes.

Depending on how your tool measures:

- Failed or timed-out requests may appear as very large latencies
- Or they may be excluded from latency and counted only in error metrics

Loadcurl reports latency with scopes such as **all**, **completed**, and **successful** — compare them. If “all” p99 blows up while “successful” looks fine, you may have a timeout / error problem rather than a slow-happy-path problem.

## How tails form under load

p99 often rises before p50 when:

- Thread or connection pools saturate
- GC pauses appear
- Lock contention increases
- Downstream dependency latency spikes
- Queueing delay builds at the load balancer

That is why climbing an RPS ladder while watching **p99** catches trouble earlier than watching averages.

## Reading a Loadcurl-style report

In a typical HTTP load report you will see min, average, max, and percentiles (p50–p99), plus throughput vs target RPS and HTTP status mix.

A healthy load run at target RPS usually shows:

- Achieved throughput near target
- Stable p95/p99 after warmup
- Low error and timeout rates

A warning run shows p50 flat while p99 climbs across the hold period — classic saturation.

See the [report card documentation](/docs/tutorial/report-card) for how Loadcurl surfaces these metrics and PDF export.

## Practical tips

- Ignore or annotate the ramp-up window when comparing percentiles
- Compare the same percentile scope between runs
- Pair latency with error rate — fast 500s are not success
- Set SLOs on the percentile your clients feel (often p95/p99), not the mean

## Related reading

- [What Is API Load Testing?](/blog/what-is-api-load-testing)
- [How to Identify API Bottlenecks](/blog/how-to-identify-api-bottlenecks)
- [Common API Performance Testing Mistakes](/blog/common-api-performance-testing-mistakes)
