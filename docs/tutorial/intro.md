---
id: intro
title: Introduction to Load Curl
sidebar_label: Introduction
sidebar_position: 1
description: Learn what Load Curl is, how the dashboard works, and how to run your first HTTP load test.
---

# Introduction to Load Curl

**Load Curl** is an HTTP load testing platform. You sign in at [app.loadcurl.com](https://app.loadcurl.com), configure a request (or paste a curl / Postman snippet), set target traffic, and run a test. Workers hit your endpoint while live metrics stream in the dashboard. When the run finishes, you get a detailed report with latency percentiles, throughput, and success or error rates — and you can download it as a PDF.

No CLI, workers, or extra infrastructure is required. Everything runs from the web dashboard.

## Why load test your API?

Your API might handle a handful of requests in development. Load testing answers questions like:

- What happens when traffic reaches a target requests-per-second rate?
- Does p95 / p99 latency stay acceptable under that load?
- How many requests succeed, time out, or return 4xx / 5xx?
- Which run was worse than the last one?

Load Curl is built so a single engineer can answer those questions from the dashboard, then invite teammates after upgrading to a company workspace.

---

## What you'll do in this tutorial

1. Create a free account (a **personal workspace** is created for you)
2. Run your first load test from the dashboard
3. Read the test report and download a PDF
4. Manage your account from **Settings**, **Profile**, and **Wallet**
5. Upgrade a personal workspace to a **company** and invite teammates

---

## Prerequisites

| Requirement | Details |
|---|---|
| A Load Curl account | [Sign up](https://app.loadcurl.com/auth/register) with email or Google — no credit card required |
| An API endpoint to test | Use a system you own or have permission to test. Staging is safer than production. |
| Basic HTTP knowledge | Methods, headers, query params, and JSON bodies |

:::tip Current platform limits
Each workspace can run a limited number of tests. Duration is **30–120 seconds**, and target traffic is up to **10,000 requests per second** (unless your account is unrestricted). Check **Wallet** in the dashboard for plan comparison.
:::

---

## Core concepts

| Term | Definition |
|---|---|
| **Personal workspace** | Created automatically when you register. You are the only member. Tests and credits stay here until you join or create a company. |
| **Company workspace** | A team workspace. Upgrade from Settings, or invite someone — both convert personal to company. One-way; you cannot switch back. |
| **Target traffic (RPS)** | How many requests per second the test should send. |
| **Ramp-up** | Seconds to climb from 0 to target traffic. `0` starts at full load immediately. |
| **Duration** | How long the test runs, in seconds (minimum 30, maximum 120). |
| **Report** | Latency (p50–p99), throughput, HTTP status breakdown, and success / failure rates for a completed run. |

You belong to **one active organization** at a time. Roles in a company are **Owner**, **Admin**, and **Member**.

---

## Next step

Ready to run your first test? Continue to [**Getting Started**](./getting-started).
