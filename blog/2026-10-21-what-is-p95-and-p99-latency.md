---
slug: what-is-p95-and-p99-latency
title: What Is p95 and p99 Latency? A Practical Guide for API Testing
description: "p95 and p99 latency show what your slowest users really experience. Learn what percentiles mean, why averages mislead, and how to use them in load tests."
authors: [loadcurl]
tags:
  - "Metrics & SLOs"
  - latency
  - p95
  - p99
  - SLOs
keywords:
  - what is p95 and p99 latency
  - p95 latency
  - p99 latency
  - latency percentiles
  - tail latency
  - API load testing
date: 2026-10-21
---

Your load test report says the average response time is 176 ms. That sounds great, and it can still hide a problem: one in every hundred users waited almost a full second. Averages smooth out exactly the requests you most need to see. Percentile latencies such as p95 and p99 bring them back. This guide explains what they mean, how to read them, and how to use them when you load test an API.

{/* truncate */}

## What is a latency percentile?

A percentile tells you the response time below which a given share of requests fall.

- **p50 (median):** half of requests were faster than this value, half were slower. It describes the typical request.
- **p95:** 95% of requests were faster than this value. The slowest 5% were worse.
- **p99:** 99% of requests were faster than this value. Only the slowest 1% were worse.

So if your p95 is 400 ms, then 19 out of 20 requests finished in 400 ms or less, and the twentieth took longer. Tail latency is the name for the slow end of this distribution, usually p95 and above.

## A worked example: why the average misleads

Imagine 100 requests with these response times:

| Requests | Response time |
| --- | --- |
| 90 | 100 ms |
| 5 | 400 ms |
| 4 | 900 ms |
| 1 | 3,000 ms |

Now compare the summary numbers, using the nearest-rank method (sort the times, then read the value at that rank):

| Metric | Value | What it tells you |
| --- | --- | --- |
| Average | 176 ms | Looks healthy, hides the tail |
| p50 | 100 ms | The typical request is fast |
| p95 | 400 ms | 5 in 100 requests were slower than this |
| p99 | 900 ms | 1 in 100 requests were slower than this |
| Max | 3,000 ms | The single worst request |

The average is only 76 ms above the median, yet the p99 is nine times the median. If you only watched the average, you would never notice.

## Why p99 matters more than it looks

One slow request in a hundred sounds acceptable until you remember that a single screen or workflow rarely makes one API call. If a page makes 20 calls and each has a 1% chance of landing in the slow tail, the chance that at least one is slow is:

```
P = 1 − 0.99^20 ≈ 0.18
```

That is roughly 18% of page loads hitting a slow call, even though each individual endpoint looks fine at p99. The same effect applies across microservices: a request that fans out to several backends is only as fast as its slowest dependency.

Tail latency also tends to be the first thing that breaks under load. When a system nears its limit, queues build up and a few unlucky requests wait far longer than the rest, so p99 moves long before the average does.

## Which percentile should you track?

| Percentile | Best for |
| --- | --- |
| p50 | Understanding the typical experience and spotting broad regressions |
| p95 | The main target for most user-facing APIs, since it covers almost everyone |
| p99 | Catching the tail, setting SLOs and spotting early signs of saturation |
| p99.9 | High-volume systems where 1 in 1,000 is still a lot of users |

A practical default is to set a goal on p95 and keep an eye on p99. Choose the actual targets from what your users need. A checkout call and a background sync have very different tolerances, so set them per endpoint, not as one global number.

## How to read percentiles in a load test

1. **Measure under load, not idle.** Latency at 5 RPS says little about latency at 500 RPS. Compare percentiles at each load level and note where p95 and p99 start to climb away from p50.
2. **Watch the gap.** A widening gap between p50 and p99 is an early warning of queueing, lock contention or resource exhaustion, even while the average still looks calm.
3. **Check it alongside errors.** Timeouts and 5xx responses often are not counted in successful-request latency, so a good p99 with a rising error rate is not a good result.
4. **Use enough requests.** A p99 computed from 50 requests is mostly noise. Aim for at least a few hundred requests, and more for p99 and above.
5. **Never average percentiles.** The average of two p99 values is not the p99 of the combined traffic. Compare runs side by side instead, or merge the raw data before computing.

## Common causes of a high p99

- Garbage collection pauses or cold starts
- Connection pool or thread pool exhaustion
- Slow or unindexed database queries that only affect certain inputs
- Cache misses on the first request for a key
- Retries without backoff, which pile extra load onto a struggling service
- Noisy neighbours on shared infrastructure

The fix starts with finding which requests are slow, then asking what they have in common: the same endpoint, the same input, the same time window.

## How to see p50, p95 and p99 in Loadcurl

Every Loadcurl test report includes p50, p95 and p99 latency, plus the throughput achieved against your target RPS and a breakdown of status codes including timeouts. To get them:

1. Paste your cURL command into a new test and set your target RPS, ramp-up and duration.
2. Run the test from cloud load generators, with nothing to install.
3. Open the report, compare p50 against p95 and p99, and download it as a PDF to share with your team.

Run the same test before and after a change to see whether the tail actually improved.

## FAQ

### Is p95 or p99 better?

Neither is better, they answer different questions. p95 reflects the experience of almost everyone, while p99 exposes the tail. Most teams set targets on p95 and monitor p99.

### What is a good p99 latency?

It depends on the endpoint and what your users expect. Set targets from user-facing needs, then check them under realistic load.

### What is the difference between p50 and the average?

p50 is the median, the middle value. The average is the sum divided by the count, and a few very slow requests can pull it far from the typical experience.

### What is tail latency?

The response times at the slow end of the distribution, usually p95, p99 and above. It matters because slow outliers affect real users and compound across multiple calls.

## Ready to see your own p95 and p99?

Paste a cURL command, set your load and get p50, p95 and p99 latency in a shareable report, in minutes. [Try Loadcurl free](https://loadcurl.com).

## Related guides

- [What Causes High p99 Latency in APIs?](/blog/what-causes-high-p99-latency-in-apis)
- [How to Calculate RPS for API Load Testing](/blog/how-to-calculate-rps-for-api-load-testing)
- [How to Identify API Bottlenecks](/blog/how-to-identify-api-bottlenecks)
- [How to Read an API Load Test Report](/blog/how-to-read-an-api-load-test-report)
