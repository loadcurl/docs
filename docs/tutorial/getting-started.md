---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 2
description: Create your Loadcurl account, verify a domain, and run your first HTTP load test.
---

# Getting Started

This page walks you through sign-up, domain verification, and running a load test from [app.loadcurl.com](https://app.loadcurl.com).

---

## Step 1 — Create your account

1. Go to [app.loadcurl.com/auth/register](https://app.loadcurl.com/auth/register).
2. Register with **name, email, and password**, or continue with **Google**.
3. Password must include uppercase and lowercase letters, a number, a special character from `!%&@#$^*?_~`, and be at least **8** characters.
4. Check your inbox and verify your email (**Account** → resend if you need a new link; the link is valid for **24 hours**).
5. Sign in at [app.loadcurl.com/auth/login](https://app.loadcurl.com/auth/login) if you are not already signed in.

Loadcurl creates a **personal workspace** for you (named like `Your name's workspace`). You do not need to create an organization to start testing.

You land on the **Dashboard** — an overview of quota, alerts, live tests, and recent runs. The request builder is **New test**, not this page.

---

## Step 2 — Verify a domain

A test can only target a hostname that is **verified** for your workspace (the host itself, or a subdomain of a verified apex).

1. Open **Domains** in the sidebar (`/organization/domains`).
2. Click **Add domain** and enter the hostname (for example `api.example.com` or `example.com`).
3. Choose **DNS TXT** (preferred) or **HTTP file**, then add the challenge your DNS or site.
4. Click **Verify**. Status becomes **Verified**.

Personal workspaces can verify **1** domain. Company workspaces can verify up to **10**. Challenges expire after **7 days** — add the domain again if the token expired.

Full steps: [**Verify a domain**](./domains.md).

If you skip this, **Start test** is blocked until a matching host is verified.

---

## Step 3 — Open New test

From the Dashboard or Tests list, click **New test** (or **Create test**). That opens `/tests/new`.

**Tests** (`/tests`) is history: search, filter by status, and open past runs. It is not the composer.

If **Usage** shows too little quota remaining, start is blocked until you recharge or upgrade on **Plan**.

---

## Step 4 — Set up your request

You have two ways to fill the HTTP request.

### Option A — Paste curl or Postman (fastest)

Click **Paste** in the request builder (help: **Paste curl or Postman**). Paste a curl command or Postman snippet. Loadcurl extracts method, URL, headers, query params, and body.

**Supported formats:**

```bash
curl -X POST https://api.example.com/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "test"}'
```

Line breaks with `\` are supported. OpenAPI import is not available.

### Option B — Fill the form

1. Optionally set a **scenario name** (otherwise a title is generated from the URL).
2. Choose an **HTTP method**: GET, POST, PUT, PATCH, or DELETE.
3. Enter a URL whose host matches a verified domain.
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
Only test endpoints you own or have permission to test. Loadcurl sends real HTTP traffic to the URL you enter.
:::

---

## Step 5 — Configure load

In **Load configuration**:

| Field | What it does | Typical start |
|---|---|---|
| **Target traffic (RPS)** | Requests sent each second at peak | `1` |
| **Ramp-up time** | Seconds to reach target RPS (`0` = immediate) | `0` |
| **Test duration** | Total run length | `30` seconds |

Defaults in the form are **30s** duration, **0** ramp-up, **1** RPS. Max duration and max RPS come from your **current plan**. The preview shows estimated total requests and **Reserved from quota: duration × RPS** (minimum 1).

Start small on staging, then increase RPS once you have a baseline.

---

## Step 6 — Start the test

Click **Start test**. The workspace must have enough **available** requests (`duration × RPS`). If quota is short, start is blocked — open **Plan** to recharge or upgrade.

The run is created, a **hold** is placed on that quota, and you are taken to `/tests/{runId}`.

While it runs you can:

- Watch **live status** (the page polls about every 3 seconds — not websockets)
- Follow the timeline: created → resources → testing → report
- **Stop** the run early if something looks wrong (unused hold is returned)

Statuses you will see: **pending**, **provisioned**, **running**, **completed**, **failed**.

---

## Step 7 — Review history and the report

When the test finishes:

1. Find it on **Dashboard** (recent / live) or **Tests** history (search and status filters).
2. Open the run to see request details, **request hold** (reserved / consumed / returned), and the **report**.
3. Download a **PDF** of the report from the run page.

Learn how to read the numbers in [**Reading test reports**](./report-card.md).

---

## What's next?

- [**Verify a domain**](./domains.md) — DNS TXT and HTTP file challenges
- [**Dashboard and account**](./dashboard.md) — nav, Account, sessions, Support
- [**Workspaces and company upgrade**](./organisation-management.md) — invite teammates
- [**Plan and usage**](./billing.md) — quota, checkout, holds
