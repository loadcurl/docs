---
slug: how-to-perform-load-testing-using-curl
title: How to Perform Load Testing Using cURL
description: "Learn how curl fits into API load testing — from single-request debugging to pasting curl into a cloud load dashboard for RPS-based runs and reports."
authors: [loadcurl]
tags:
  - "How-to guides"
  - curl
  - API testing
  - load testing
date: 2026-09-02
---

**curl** is the universal language of HTTP. Developers copy it from docs, browsers, and gateways. That makes it a natural starting point for API load testing — but curl alone is not a load generator.

{/* truncate */}

Here is how to use curl the right way: debug with it, then scale with a proper load profile.

## What curl is good at

- Reproducing a single failing request
- Confirming auth headers and status codes
- Timing one call with `-w` / `-o`
- Exporting a canonical request teammates can paste

Example:

```
curl -sS -X POST 'https://api.example.com/v1/orders' \
  -H 'Authorization: Bearer TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"sku":"sku_123","qty":1}'
```

## What curl is bad at (for load)

Naive loops like `for i in {1..1000}; do curl ...; done` are **not** load tests:

- They are usually sequential, not concurrent
- They do not control RPS precisely
- They skew latency with client overhead
- They rarely produce p95/p99 or throughput reports
- Your laptop becomes the bottleneck quickly

Shell parallelism (`xargs -P`, background jobs) is still a rough hammer — fine for a smoke blast, weak for capacity claims.

## A practical workflow: curl → load test

### 1. Perfect one request with curl

Make sure the call returns the expected status and body on staging. Fix auth, headers, and JSON first.

### 2. Capture the curl (or Postman) snippet

Keep it as the source of truth for the request shape.

### 3. Paste into a load testing dashboard

Tools like [Loadcurl](https://loadcurl.com) accept **curl / Postman paste** into the composer, then let you set:

- Target **RPS**
- **Ramp-up**
- **Duration**

Cloud generators send the traffic; you are not installing workers. You must **verify the domain** before runs can target that host.

### 4. Read percentiles and HTTP outcomes

Judge the run on p95/p99, achieved RPS vs target, and error/timeout rates — not on how fast your shell loop felt.

## Timing a single request with curl

For quick local checks:

```
curl -sS -o /dev/null -w 'time_total=%{time_total}\nhttp_code=%{http_code}\n' \
  'https://staging.example.com/health'
```

Useful for debugging. Not a substitute for a multi-minute RPS hold.

## Security and safety

- Prefer staging tokens in curl history and shared snippets
- Do not load test hosts you do not own
- Strip secrets before pasting into tickets; rotate if leaked
- Ramp up; production traffic is real

## Curl + Loadcurl in practice

1. Register at [app.loadcurl.com](https://app.loadcurl.com/auth/register)
2. Verify your domain ([docs](/docs/tutorial/domains))
3. Open **New test** and paste your curl
4. Set RPS, ramp-up, duration
5. Start — the run page polls live status about every 3 seconds
6. Download the report PDF when finished

This keeps curl as the authoring format while cloud infrastructure handles concurrency and reporting.

## When to stay local vs go cloud

Stay local for functional curl debugging. Move to cloud generators when you need sustained RPS, clean percentiles, and isolation from laptop limits — covered in [Cloud-Based vs Local Load Testing](/blog/cloud-based-vs-local-load-testing).

## Related guides

- [What Is API Load Testing?](/blog/what-is-api-load-testing)
- [How to Calculate RPS](/blog/how-to-calculate-rps-for-api-load-testing)
- [Getting started](/docs/tutorial/getting-started)
