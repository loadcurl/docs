---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Create your Load Curl account and run your first HTTP load test from the dashboard.
---

# Getting Started

This page walks you through sign-up and running a load test from [app.loadcurl.com](https://app.loadcurl.com).

---

## Step 1 — Create your account

1. Go to [app.loadcurl.com/auth/register](https://app.loadcurl.com/auth/register).
2. Register with **name, email, and password**, or continue with **Google**.
3. Check your inbox and verify your email (Settings → Email verification if you need to resend).
4. Sign in at [app.loadcurl.com/auth/login](https://app.loadcurl.com/auth/login).

Load Curl creates a **personal workspace** for you (named like `Your name's workspace`). You do not need to create an organization to start testing.

You land on the **Dashboard**. From there you can create a test, watch live metrics, and open past runs.

---

## Step 2 — Open Create test

On the Dashboard:

- Summary cards show how many tests you have, how many are running, and remaining capacity.
- **Create test** is the form for a new run.
- The history list below shows previous runs. Use **New test** in the header (or `/?newTest=…`) to jump back to the form.

If remaining tests is `0`, you cannot start another run until capacity is available.

---

## Step 3 — Set up your request

You have two ways to fill the HTTP request.

### Option A — Paste curl or Postman (fastest)

Click **Paste curl / Postman** in the request builder. Paste a curl command or Postman snippet. Load Curl extracts method, URL, headers, query params, and body.

**Supported formats:**

```bash
curl -X POST https://api.example.com/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "test"}'
```

Line breaks with `\` are supported.

### Option B — Fill the form

1. Optionally set a **scenario name** (otherwise a title is generated from the URL).
2. Choose an **HTTP method**: GET, POST, PUT, PATCH, or DELETE.
3. Enter a full **https://** (or **http://**) URL.
4. Use the tabs:

| Tab | Use it for |
|---|---|
| **Params** | Query string key-value pairs |
| **Headers** | `Authorization`, `Content-Type`, API keys, custom headers |
| **Body** | JSON object for POST, PUT, or PATCH |

Example header:

| Header | Example |
|---|---|
| `Authorization` | `Bearer eyJhbGciOiJIUzI1NiIs...` |
| `Content-Type` | `application/json` |

Example body (must be a JSON object):

```json
{
  "user_id": "demo",
  "page": 1
}
```

:::caution
Only test endpoints you own or have permission to test. Load Curl sends real HTTP traffic to the URL you enter.
:::

---

## Step 4 — Configure load

In **Load configuration**:

| Field | What it does | Typical start |
|---|---|---|
| **Target traffic (RPS)** | Requests sent each second at peak | `1` |
| **Ramp-up time** | Seconds to reach target RPS (`0` = immediate) | `0` |
| **Test duration** | Total run length | `30` seconds (max `120`) |

The preview shows estimated total requests. Start small on staging, then increase RPS once you have a baseline.

---

## Step 5 — Start the test

Click **Start test**. The run is created and workers begin sending traffic.

While it runs you can:

- Watch **live metrics** (requests, successes, failures, latency, RPS)
- Open the run from history for a live snapshot
- **Stop** the run early if something looks wrong

Statuses you will see: **pending**, **provisioned**, **running**, **completed**, **failed**.

---

## Step 6 — Review history and the report

When the test finishes:

1. Find it in the Dashboard history list (search and status filters are available).
2. Open the run to see request details and the **report**.
3. Download a **PDF** of the report from the run page.

Learn how to read the numbers in [**Reading test reports**](./report-card).

---

## What's next?

- [**Dashboard and account**](./dashboard) — Settings, sessions, Wallet, Profile
- [**Workspaces and company upgrade**](./organisation-management) — Invite teammates
