---
slug: how-to-load-test-an-api-from-postman
title: How to Load Test an API from Postman
description: "Turn a working Postman request into an API load test: export or copy the call, paste into Loadcurl, set RPS and ramp-up, then read the report."
authors: [loadcurl]
tags:
  - "How-to guides"
  - Postman
  - API load testing
  - HTTP
date: 2026-09-06
---

Postman is excellent for building and debugging one HTTP request. It is not a load generator. The fastest path to a trustworthy RPS run is: **perfect the call in Postman, then replay it under a controlled load profile**.

{/* truncate */}

## Why Postman alone is not enough

Collection Runner and simple scripts can fire many requests, but they rarely give you:

- Precise **target RPS** with ramp-up
- Clean **p95 / p99** under sustained hold
- Throughput vs target and HTTP outcome mix in one report
- Cloud generators that are not capped by your laptop

Treat Postman as the **authoring** tool. Treat a load dashboard as the **measurement** tool.

## Step 1: Make the request correct in Postman

On staging (preferred):

1. Method, URL, query params, headers, and JSON body match production shape
2. Auth works (Bearer, API key, etc.)
3. You get the expected status code and body
4. Secrets are staging-scoped — not production admin tokens

Save that request. You will reuse the same shape under load.

## Step 2: Get a pasteable snippet

Depending on your Postman version:

- **Code snippet → cURL** from the request, or
- Copy as curl / export the HTTP details your team already shares

Loadcurl’s composer accepts **curl / Postman paste** and fills method, URL, headers, params, and body for you. You can also fill those fields manually on **New test**.

## Step 3: Verify the hostname in Loadcurl

Loadcurl only sends traffic to hosts your workspace has verified. Open **Domains**, add the hostname from your Postman URL (or paste the full URL — only the host is kept), then verify with DNS TXT or HTTP file.

Verifying `example.com` also covers `api.example.com`. Personal workspaces: **1** domain. Company: up to **10**.

Details: [Verify a domain](/docs/tutorial/domains).

## Step 4: Paste into New test and set the load profile

1. Sign in at [app.loadcurl.com](https://app.loadcurl.com)
2. Open **New test**
3. Paste the Postman/curl snippet (or fill the form)
4. Set **duration**, **ramp-up**, and **target RPS** within your plan caps
5. Start — the app checks remaining quota first (`duration × RPS` hold)

Each Loadcurl test is **one HTTP request** repeated under that profile (no multi-step Postman collections yet).

## Step 5: Watch the run and read the report

The run page polls about every **3 seconds** through pending → provisioned → running. When it finishes you get:

- Request summary (2xx–5xx, timeouts, success rates)
- Throughput vs target RPS
- Latency percentiles (p50–p99), often by scope (all / completed / successful)
- PDF download for sharing

See [How to Read an API Load Test Report](/blog/how-to-read-an-api-load-test-report).

## Postman collection tips that transfer cleanly

- Prefer environment variables resolved **before** you copy curl (so the pasted URL is concrete)
- Avoid Postman-only pre-request scripts that mint tokens unless you also set the final header in the paste
- Keep body JSON identical to what you validated
- Name the Loadcurl test after the Postman request so history stays searchable

## Common mistakes

- Pasting a production URL you have not verified (or should not load-test)
- Skipping ramp-up after a gentle Postman check
- Judging success only by Collection Runner “pass” counts instead of p95/p99
- Forgetting quota: a 600s × 200 RPS run holds **120,000** requests

## Related guides

- [How to Perform Load Testing Using cURL](/blog/how-to-perform-load-testing-using-curl)
- [How to Calculate RPS](/blog/how-to-calculate-rps-for-api-load-testing)
- [Getting started](/docs/tutorial/getting-started)
