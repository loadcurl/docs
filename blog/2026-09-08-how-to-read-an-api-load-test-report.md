---
slug: how-to-read-an-api-load-test-report
title: How to Read an API Load Test Report
description: "A practical walkthrough of Loadcurl reports: success rate, throughput vs target RPS, p95/p99 latency scopes, HTTP outcomes, and PDF export."
authors: [loadcurl]
tags:
  - "How-to guides"
  - load test report
  - latency
  - throughput
  - RPS
date: 2026-09-08
---

A load test without a readable report is just expensive noise. Here is how to read a Loadcurl-style HTTP report so you can decide pass/fail in minutes.

{/* truncate */}

## Where the report lives

After **Start test**, open the run from **Dashboard** or **Tests**. The run page polls about every **3 seconds** (no websockets). Timeline: **Created → Resources → Testing → Report** (or failed / stopped).

While the report is calculating you may see a processing state — wait. There is **no letter grade** and **no public share link**. Download a **PDF** or keep teammates in the same workspace.

## Start with the highlights

Most reports surface:

- **Success rate**
- **Total requests**
- **Average latency**
- **Average RPS**

Use these as a headline, not the verdict. Dig into throughput, latency percentiles, and status mix next.

## Request summary: correctness under load

Look for counts and rates such as:

- Total, completed, successful, failed
- Timeouts and transport errors
- HTTP **2xx / 3xx / 4xx / 5xx**
- Success, completion, failure, and timeout rates

Ask:

- Are failures **5xx** (server) or **4xx** (client/auth/validation)?
- Are **timeouts** rising — a sign of saturation or too-tight budgets?
- Is “success rate” high while p99 is terrible? Users still feel pain.

## Throughput: did you actually hit the target?

Compare:

- **Target RPS** (what you configured)
- Average / peak / minimum RPS achieved
- Successful and completed RPS
- RPS vs target (achievement)
- Response bytes and bytes/sec (average and peak)

**Interpretation tips:**

- Average RPS ≈ target, healthy errors → capacity looks good for that profile
- Average RPS ≪ target → the API, network, or errors prevented the generators from sustaining load
- Peak much higher than average with a bad p99 → unstable under hold

## Latency: read percentiles by scope

Reports often group latency for **all**, **completed**, and **successful** requests:

- Min, average, max, standard deviation
- **p50, p75, p90, p95, p99**

Prefer **p95 / p99 on successful requests** for SLO conversations. If “all” looks much worse than “successful,” failures and timeouts are dominating the tail.

Deep dive: [What Is p95 and p99 Latency?](/blog/what-is-p95-and-p99-latency).

## Request results table

Paginated per-request outcomes (**Completed**, **Timeout**, **Error**) with status codes help you spot patterns — a burst of 429s, a dependency 502, or slow payloads. Expand a row when body/error detail is present.

## Request hold (quota context)

On the live run you may also see **Reserved / Consumed / Returned** for the quota hold (`duration × RPS`). Stopping early **releases** unused hold. That is billing mechanics — not a performance metric — but it explains why Usage changed.

## A simple pass/fail script

Before the run, write criteria. After the report:

1. Throughput within ~X% of target?
2. Successful p95 / p99 under budget?
3. Error + timeout rates under threshold?
4. Any surprise 429/5xx pattern?

If no → open [How to Identify API Bottlenecks](/blog/how-to-identify-api-bottlenecks) and re-run the **same** profile after one change.

## Share the PDF

Download PDF once the report is ready. Attach it to the launch checklist or incident doc so product and infra argue from the same numbers.

Product reference: [Tests and reports](/docs/tutorial/report-card).
