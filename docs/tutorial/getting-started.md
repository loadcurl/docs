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

You will land on the **Dashboard**. From here you can configure an HTTP request manually or import from curl/Postman, set your load profile, and run a test — live metrics stream in real time as workers hit your endpoint.

---

## Step 2 — Set up your request

You have two ways to configure your HTTP request:

### Option A — Import from curl or Postman (fastest)

If you already have a curl command or a Postman snippet, paste it directly into the **Import from curl or Postman** panel and click **Parse & fill form**. Load Curl will automatically extract the method, URL, headers, and body for you.

**Supported formats:**

```bash
# curl command
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "test"}'
```

```bash
# Postman request snippet
request POST 'http://localhost:4000/api/users' \
  --header 'Content-Type: application/json' \
  --body '{"name": "test"}'
```

Line breaks using `\` are supported in both formats.

### Option B — Fill manually

Give your test a **Scenario name** (optional, e.g. `Fetch user profile`), then:

1. Select your **HTTP method** from the dropdown — GET, POST, PUT, DELETE, etc.
2. Enter your full **endpoint URL** (e.g. `https://api.yourapp.com/v2/users`).
3. Use the tabs below the URL to add **Query Params**, **Headers**, or a **Body**.

#### Add authentication headers (optional)

If your endpoint requires authentication, open the **Headers** tab and add:

| Header | Example value |
|---|---|
| `Authorization` | `Bearer eyJhbGciOiJIUzI1NiIs...` |
| `x-api-key` | `sk-prod-abc123` |
| `Content-Type` | `application/json` |

#### Add a request body (optional)

For `POST` or `PUT` endpoints, select the method from the dropdown, open the **Body** tab, and paste your JSON:

```json
{
  "user_id": "demo",
  "page": 1,
  "limit": 20
}
```

---

## Step 3 — Configure your load profile

Scroll to the **Load Configuration** panel and set how aggressively workers hit your endpoint:

| Field | What it does | Default |
|---|---|---|
| **Concurrent Users** | Number of virtual users hitting your endpoint simultaneously | 10 |
| **Duration (s)** | How long the test runs in total | 10 |
| **Ramp-up (s)** | Time to gradually reach full concurrency (0 = instant spike) | 0 |
| **Max RPS** | Cap on requests per second (0 = unlimited) | 1 |

:::tip
A short ramp-up period helps avoid artificial timeouts from an instant traffic spike. Start with the defaults above, then increase concurrency once you have a baseline.
:::

---

## Step 4 — Watch live metrics

Click **Start Test**. The **Status** indicator changes from **Idle** to **Running**, and the **Live Metrics** panel streams results in real time:

- **Total Requests** — cumulative requests fired so far
- **Success** — requests that returned a 2xx response
- **Failed** — requests that errored or timed out
- **Avg Latency** — mean response time across all requests
- **RPS** — current requests per second

The test runs for the full duration you configured, then finalises the **Report Card**.

### Test controls

The **Status** indicator shows the current test state: **Idle** (not yet started), **Running** (test in progress), or **Completed**. Use **Stop Test** to halt early, or **Clear & Reset** to wipe the form and start fresh.

---

## Step 5 — Inspect logs

The **Logs / Response** panel at the bottom of the page streams live request and response details as the test runs. Use this to spot errors, unexpected status codes, or slow individual responses.

No activity appears in this panel until a test is started.

---

## What's next?

- Learn how to read your [**Report Card**](./report-card)
- Build a [**multi-endpoint scenario**](./scenario-builder) to test a full user journey
