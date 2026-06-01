---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Create your Load Curl account and run your first load test in under 60 seconds.
---

# Getting Started

This page walks you through account setup and running your very first load test.

---

## Step 1 — Create your account

1. Go to [app.loadcurl.com/auth/register](https://app.loadcurl.com/auth/register).
2. Sign up with your email address.
3. Verify your email and log in.

You will land on the **Dashboard**, which shows your test history, usage quota, and quick-start options.

---

## Step 2 — Paste your endpoint

Click **New Test** in the top navigation.

In the **Endpoint** field, enter the full URL of the API you want to test:

```
https://api.yourapp.com/v2/users
```

### Add authentication headers (optional)

If your endpoint requires authentication, expand the **Headers** section and add them:

| Header | Example value |
|---|---|
| `Authorization` | `Bearer eyJhbGciOiJIUzI1NiIs...` |
| `x-api-key` | `sk-prod-abc123` |
| `Content-Type` | `application/json` |

### Add a request body (optional)

For `POST` or `PUT` endpoints, select the HTTP method from the dropdown and paste your JSON body:

```json
{
  "user_id": "demo",
  "page": 1,
  "limit": 20
}
```

:::info Import from Postman or OpenAPI
You can skip manual entry entirely. Click **Import** and upload a Postman collection (`.json`) or an OpenAPI spec (`.yaml` / `.json`) — Load Curl will pre-fill the endpoint, headers, and body for you.
:::

---

## Step 3 — Configure your load profile

The **Load Profile** panel controls how workers behave during the test.

| Setting | What it does | Starter default |
|---|---|---|
| **Concurrent users** | Total number of workers running at peak | 50 |
| **Duration** | How long the test runs at full load | 60 s |
| **Ramp-up time** | Seconds to gradually reach full concurrency | 10 s |
| **Target region** | Geographic source of worker traffic | Auto |

### Choosing the right concurrency

A common starting point is **10 × your expected peak traffic**. For example, if you expect 100 simultaneous users on launch day, start with a 1,000-worker test to build in a safety margin.

:::tip
Always use a ramp-up period. Sending full concurrency instantly can cause artificial timeouts that hide real bottlenecks.
:::

---

## Step 4 — Run the test

Click **Start Test**. You will be taken to the **Live Dashboard** where you can watch metrics stream in real time:

- **RPS** — current requests per second
- **P50 / P95 / P99 latency** — response time percentiles updating every second
- **Error rate** — percentage of non-2xx responses
- **Throughput** — data transferred per second
- **Server CPU** — resource usage (when your server agent is installed)

The test runs for the full duration you configured, then finalises the **Report Card**.

---

## What's next?

- Learn how to read your [**Report Card**](./report-card)
- Build a [**multi-endpoint scenario**](./scenario-builder) to test a full user journey
