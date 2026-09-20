---
slug: load-testing-graphql-over-http
title: Load Testing GraphQL over HTTP
description: "How to load test GraphQL APIs over HTTP with POST, headers, and JSON bodies — what works in Loadcurl today, and pitfalls unique to GraphQL."
authors: [loadcurl]
tags:
  - "How-to guides"
  - GraphQL
  - HTTP
  - API load testing
date: 2026-09-18
---

GraphQL usually rides on **HTTP POST** (sometimes GET). That means you can load test it with any HTTP load tool — including Loadcurl — as long as you send the right URL, headers, and JSON body.

{/* truncate */}

There is **no separate GraphQL protocol mode** in Loadcurl today (and no gRPC/WebSocket tester). Treat GraphQL as HTTP.

## What to put in the request

Typical shape:

```
POST /graphql
Content-Type: application/json
Authorization: Bearer STAGE_TOKEN

{
  "query": "query HeroName { hero { name } }",
  "variables": {}
}
```

Validate once in Postman/curl, then paste into **New test**. Verify the hostname first.

## GraphQL-specific pitfalls under load

### 1. HTTP 200 with errors in the body

Many GraphQL servers return **200** even when `errors` is populated. Your load report may show a healthy 2xx rate while clients are failing. Check response samples / request results, and monitor app-level error metrics.

### 2. Over-fetching hides the real hotspot

A single “simple” query can fan out to many resolvers and services. p99 may reflect the heaviest resolver, not the gateway.

### 3. Persisted vs ad-hoc queries

Ad-hoc queries stress parsing and planning differently than persisted queries in production. Match what you actually ship.

### 4. N+1 resolver patterns

Load tests that only hit a tiny entity look fine until a list field explodes. Include representative list queries in a separate test.

### 5. Auth and complexity limits

Complexity/depth limiters and per-token rate limits often show up as 429 or GraphQL errors before CPU saturates.

## How to structure Loadcurl tests

Because each test is **one HTTP request** under a load profile:

- Test the **hottest query** alone first
- Add a second test for a **mutation** path
- Use smoke → load ladders like REST
- Compare PDFs when you change dataloader / caching / indexes

## Pass criteria ideas

- Target RPS sustained
- Gateway + resolver p95/p99 under budget (from APM)
- Transport error/timeout rates low
- Application-level GraphQL error rate under budget (not only HTTP 2xx)

## Related reading

- [How to Load Test from Postman](/blog/how-to-load-test-an-api-from-postman)
- [How to Identify API Bottlenecks](/blog/how-to-identify-api-bottlenecks)
- [FAQ — what you can test](/docs/tutorial/faq)
