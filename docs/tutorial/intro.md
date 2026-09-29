---
id: intro
title: Introduction to Loadcurl
sidebar_label: Introduction
sidebar_position: 1
description: Learn what Loadcurl is, how the free plan works, and how to run your first HTTP load test.
---

# Introduction to Loadcurl

**Loadcurl** is an HTTP load testing platform. You sign in at [app.loadcurl.com](https://app.loadcurl.com), verify your email, compose a request (or paste a curl / Postman snippet), set duration, ramp-up, and target traffic, then start a run. The free plan needs no credit card. Each test stays inside the **free-plan limit**. Load above that limit is available after you **verify a domain** and your plan allows it. Open **Plan** for the current numbers. Cloud workers hit that endpoint while the run page polls live status. When the run finishes you get a report — latency percentiles, throughput vs target RPS, HTTP outcomes — and you can download it as a PDF.

No CLI, workers, or extra infrastructure is required. Everything runs from the web dashboard.

## Why load test your API?

Your API might handle a handful of requests in development. Load testing answers questions like:

- What happens when traffic reaches a target requests-per-second rate?
- Does p95 / p99 latency stay acceptable under that load?
- How many requests succeed, time out, or return 4xx / 5xx?
- Which run was worse than the last one?

Loadcurl is built so a single engineer can answer those questions from the dashboard, then invite teammates after upgrading to a company workspace.

---

## What you'll do in this tutorial

1. Create a free account (a **personal workspace** is created for you — no credit card)
2. Verify your **email**
3. Run your first test from **New test** inside the free-plan limit
4. Read the report and download a PDF
5. Verify a **domain** when you need load above that cap
6. Use **Dashboard**, **Tests**, **Plan**, **Usage**, **Account**, and **Support**
7. Upgrade to a **company** workspace when you need a team

---

## Prerequisites

| Requirement | Details |
|---|---|
| A Loadcurl account | [Sign up](https://app.loadcurl.com/auth/register) with email or Google — no credit card required |
| A verified email | Required before any test can run. Resend the link from **Account** (valid for 24 hours). |
| An API endpoint to test | Use a system you own or have permission to test. Staging is safer than production. Inside the free-plan limit, the hostname does not have to be verified. |
| Basic HTTP knowledge | Methods, headers, query params, and JSON bodies |

:::tip[Free plan limits]

Each workspace starts on **Free**. Every free-plan test is capped by the plan’s `max_rps` and `max_test_duration`, and creating a test enforces them. You can stay inside that limit without verifying a domain. Load above it requires a verified domain and a plan that allows it. A free-plan organization can have **one active test** at a time. Pending, provisioned, and running all count as active. Paid plans are unchanged. Open **Plan** in the dashboard for live numbers — they can change by market (US or India).

:::

---

## Core concepts

| Term | Definition |
|---|---|
| **Personal workspace** | Created automatically when you register. You are the only member. Tests, quota, and billing stay here until you join or create a company. |
| **Company workspace** | A team workspace. Upgrade from Account, or invite someone — both convert personal to company. One-way; you cannot switch back. |
| **Verified domain** | A hostname you prove you control (DNS TXT or HTTP file). Required when the test goes above the free-plan limit. A verified host also covers its subdomains. |
| **Target traffic (RPS)** | How many requests per second the test should send at peak. Capped by your plan. On Free, that is the free-plan limit. |
| **Ramp-up** | Seconds to climb from 0 to target traffic. `0` starts at full load immediately. |
| **Duration** | How long the test runs, in seconds. Capped by your plan. On Free, that is the free-plan limit. |
| **Active test** | On the free plan, a test that is pending, provisioned, or running. Only one may be open. After it completes or fails, the next can start. |
| **Request quota** | Monthly allotment on the current plan: **allotted**, **available**, **held**, and **used**. Starting a test holds `duration × RPS` until the run settles. |
| **Plan vs Usage** | **Plan** is billing and checkout. **Usage** is the quota bar, holds, and ledger. |
| **Report** | Latency (p50–p99), throughput vs target, HTTP status mix, and success / failure rates for a completed run. |

You belong to **one active organization** at a time. Roles in a company are **Owner**, **Admin**, and **Member**.

---

## First-run path

```
Register  →  verify email  →  New test (free-plan limit)  →  Start  →  live run  →  report
```

Dashboard is an **overview** (quota, alerts, live and recent runs). You compose a request on **New test**, not on Home.

---

## Next step

Ready to run your first test? Continue to [**Getting Started**](./getting-started.md).
