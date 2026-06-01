---
id: intro
title: Introduction to Load Curl
sidebar_label: Introduction
sidebar_position: 1
description: Learn what Load Curl is, why API load testing matters, and how to get started in under 60 seconds.
---

# Introduction to Load Curl

**Load Curl** is an API load testing platform that lets you simulate thousands of concurrent users against your endpoints — without managing any infrastructure. You get real-time metrics, a graded report card, and actionable recommendations in under 60 seconds.

## Why load test your API?

Shipping a feature without a load test is like rehearsing a play with one actor. Your API might handle 10 requests per second fine in development, but what happens when 1,000 users hit it simultaneously at launch?

Load testing answers questions like:

- What is my API's breaking point?
- Does P95 latency stay under 300 ms at peak load?
- Will my server CPU saturate before I hit my traffic targets?
- Which endpoint is the bottleneck — and why?

Load Curl is purpose-built to make these questions easy to answer for **any engineering team**, regardless of size.

---

## What you'll build in this tutorial

By the end of this tutorial you will:

1. Create a free Load Curl account
2. Run your first load test against a live API endpoint
3. Read and understand the graded **Report Card**
4. Set up a threshold alert for SLA monitoring
5. Integrate Load Curl into a **GitHub Actions** CI/CD pipeline

---

## Prerequisites

| Requirement | Details |
|---|---|
| A Load Curl account | [Sign up free](https://app.loadcurl.com/auth/register) — no credit card required |
| An API endpoint to test | Can be your own app or a public endpoint |
| Basic HTTP knowledge | You should know what headers and request bodies are |

:::tip Free tier limits
The **Starter plan** (free forever) supports 50 concurrent workers and 5 test runs per month — plenty to follow this entire tutorial.
:::

---

## Core concepts

Before diving in, here are the key terms used throughout the docs:

| Term | Definition |
|---|---|
| **Worker** | A single virtual user that sends requests to your endpoint |
| **Concurrency** | The number of workers running simultaneously |
| **Ramp-up** | A gradual increase from 0 to full concurrency to avoid a cold-start spike |
| **P95 latency** | The response time at the 95th percentile — 95 % of requests were faster than this value |
| **RPS** | Requests per second — the throughput your API delivers under load |
| **Report Card** | Load Curl's A–F graded summary of your test across 8 metrics |

---

## Next step

Ready to run your first test? Continue to [**Getting Started**](./getting-started).
