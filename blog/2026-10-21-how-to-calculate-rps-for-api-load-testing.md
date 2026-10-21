---
slug: how-to-calculate-rps-for-api-load-testing
title: How to Calculate RPS for API Load Testing (Formulas + Examples)
description: "Learn how to calculate the requests per second (RPS) your API needs to handle, using daily traffic, user counts and latency, with worked examples."
authors: [loadcurl]
tags:
  - "How-to guides"
  - RPS
  - "API load testing"
  - capacity
keywords:
  - how to calculate RPS for API load testing
  - calculate RPS
  - requests per second
  - API load testing RPS
  - target RPS
date: 2026-10-21
---

The most common reason a load test tells you nothing is a made-up number. Someone picks 1,000 RPS because it sounds big, the API passes, and the team ships a launch that falls over at 300. This guide shows you how to work out the RPS your API really needs to handle, using data you already have, before you run a single test.

{/* truncate */}

## What is RPS?

RPS (requests per second) is the number of HTTP requests your API receives each second. You will also see it called QPS or throughput. In a load test, RPS is the rate at which the test sends requests, and the throughput the API actually sustains is what you compare it against.

RPS is not the same as concurrent users. One active user can fire several requests in a second, while a thousand users sitting on a page may generate almost none. That is why you convert users into RPS instead of testing with a user count alone.

## The basic formula

```
RPS = total requests / time window in seconds
```

Everything else is a decision about which requests to count and which time window to use. There are three practical ways to get those inputs.

## Method 1: From existing traffic (most accurate)

If the API is already live, pull request counts from your API gateway, server logs or APM tool.

1. Take the total requests for a busy day.
2. Divide by 86,400 (seconds in a day) to get the average RPS.
3. Find your peak: take the busiest minute or hour and divide by the seconds in it. Peak is commonly 3 to 10 times the daily average, depending on the product.
4. Add headroom. A 2× multiplier on peak is a sensible starting target.

Here is a worked example for an API serving 500,000 requests a day:

| Step | Calculation | Result |
| --- | --- | --- |
| Average RPS | 500,000 ÷ 86,400 | ≈ 5.8 |
| Peak RPS (assuming 5× average) | 5.8 × 5 | ≈ 29 |
| Test target (2× headroom) | 29 × 2 | ≈ 58, round to 60 |

The 5× multiplier is only a placeholder. If you can read the real busiest-minute number from your logs, use that instead.

## Method 2: From expected users (new launches)

No traffic yet? Estimate from your user forecast.

```
RPS = (users × API calls per user) / time window in seconds
```

Say a launch campaign brings 20,000 users in 10 minutes, and each user triggers about 8 API calls (login, profile, listing, search and so on):

- 20,000 × 8 = 160,000 requests
- 160,000 ÷ 600 seconds ≈ 267 RPS

Real traffic arrives in bursts, not evenly, so add a 1.5× to 2× buffer and plan for roughly 400 to 530 RPS.

## Method 3: From concurrency and latency (Little's Law)

This one tells you how many requests are in flight at the same time, which is what your connection pools and thread pools actually feel.

```
concurrent requests = RPS × average latency (seconds)
```

At 200 RPS with a 250 ms average response time, about 200 × 0.25 = 50 requests are in flight. If latency degrades to 1 second, the same 200 RPS means 200 requests in flight.

Pools fill up, queues grow, latency gets worse, and the slowdown feeds itself. Use this calculation to sanity check connection pool sizes and to understand why a small latency regression can turn into an outage.

## Choosing test duration and ramp-up

**Ramp up gradually.** Climb to the target over a minute or two instead of hitting full RPS instantly. A ramp shows you the RPS at which latency starts to climb.

**Hold at target long enough.** Caches, autoscaling and connection pools need time to settle. Five to ten minutes is a reasonable minimum for a first run.

**Test more than one level.** Run at 50%, 100% and 150% of your target so you find the breaking point instead of a simple pass or fail.

## Common mistakes when calculating RPS

- **Using the daily average as the target.** Traffic is never flat. Test the peak.
- **Counting page views instead of API calls.** One page load often triggers many API requests.
- **Ignoring the endpoint mix.** Login, search and checkout have very different costs. Hammering one cheap endpoint at your total RPS proves little.
- **Treating RPS as users.** Concurrent users and RPS are different units. Convert, don't swap.
- **Testing only up to the target.** With no headroom, the first unexpected spike is also your first real test.
- **Letting the load generator become the bottleneck.** A laptop on Wi-Fi cannot reliably send high RPS. Use cloud-based load generators so the numbers reflect your API, not your machine.

## How to run the test in Loadcurl

Once you have your number, the test itself takes a few minutes:

1. Verify you own the domain (DNS TXT record or a file upload). Loadcurl only sends traffic to hosts you control.
2. Paste your cURL command into the new test form. Method, URL, headers and body are filled in for you.
3. Set your target RPS, ramp-up and duration.
4. Run the test and watch progress live.

The report shows the throughput the API actually achieved against your target, a breakdown of status codes (2xx to 5xx and timeouts), and p50, p95 and p99 latency. If achieved throughput falls short of the target while errors or timeouts climb, you have found your limit.

## FAQ

### What is a good RPS for an API?

There is no universal number. It depends entirely on your traffic, so calculate it from your own logs or user forecast using the methods above.

### What is the difference between RPS and TPS?

RPS counts individual HTTP requests. TPS counts transactions, and one transaction (such as a checkout) can involve several requests.

### How many RPS can one server handle?

It depends on the endpoint, the hardware, the database and the code path. The only reliable answer is to measure it with a load test.

### Should I test at average or peak RPS?

Peak, plus headroom. Average load rarely breaks anything.

## Ready to test your API?

Paste a cURL command, set your target RPS and get a full latency and throughput report in minutes, with no load generators to install. [Try Loadcurl free](https://loadcurl.com).

## Related guides

- [What Is p95 and p99 Latency?](/blog/what-is-p95-and-p99-latency)
- [How to Test an API for 10,000 Requests Per Second](/blog/how-to-test-an-api-for-10000-requests-per-second)
- [API Performance Testing Best Practices](/blog/api-performance-testing-best-practices)
- [Getting started with Loadcurl](/docs/tutorial/getting-started)
