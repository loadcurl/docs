---
id: report-card
title: Reading the Report Card
sidebar_label: Report Card
sidebar_position: 3
description: Understand every metric, grade, and recommendation in a Load Curl report card.
---

# Reading the Report Card

Every completed test produces a **Report Card** — a single-page graded summary that tells you exactly how your API performed and what to fix.

---

## The overall grade

Load Curl weighs 8 metrics and produces a letter grade from **A** to **F**.

| Grade | Meaning |
|---|---|
| **A** | Excellent — all metrics green, ready to scale |
| **B** | Good — minor latency issues, low production risk |
| **C** | Fair — needs tuning before handling high traffic |
| **D** | Poor — multiple metrics failing SLA targets |
| **F** | Critical — server degradation detected, do not ship |

The grade is designed to be a single, shareable signal. You can paste a public report link into a pull request or send it to a manager without needing to explain raw numbers.

---

## The 8 graded metrics

### 1. P95 Response Time

The 95th-percentile latency across all requests during the test.

- **Green (A):** < 300 ms
- **Yellow (B/C):** 300 ms – 1 s
- **Red (D/F):** > 1 s

P95 is a better signal than average latency because it captures what your slowest users actually experience. An average of 50 ms is meaningless if 5 % of requests are taking 3 seconds.

### 2. Error Rate

The percentage of requests that returned a non-2xx HTTP status code.

- **Green (A):** < 0.1 %
- **Yellow (B/C):** 0.1 % – 1 %
- **Red (D/F):** > 1 %

### 3. Requests per Second (RPS)

Peak throughput your API delivered during the test. Higher is better, but this metric is graded relative to your concurrency level — a 50-worker test scoring 400 RPS is proportionally the same as a 1,000-worker test at 8,000 RPS.

### 4. Throughput

Total data transferred per second. A sudden drop in throughput mid-test often signals a connection pool exhaustion or a rate limiter kicking in.

### 5. Server CPU Peak

The highest CPU utilisation observed on your server during the test. Requires the optional server agent.

- **Green (A):** < 70 %
- **Yellow (B/C):** 70 % – 90 %
- **Red (D/F):** > 90 %

### 6. Availability

The percentage of time your server returned any response (including error codes). A value below 99 % usually means the server was completely unreachable for some workers.

### 7. Latency Stability

Measures how much latency varied over the test duration. An API that starts at 200 ms and ends at 1,500 ms has poor stability — a sign of a memory leak or connection saturation over time.

### 8. P99 Response Time

The 99th-percentile latency. Used as a tiebreaker to distinguish a **B+** from an **A–**. If your P95 is healthy but your P99 is very high, a small percentage of users are experiencing severe delays.

---

## Recommendations panel

Below the grade, the Report Card shows specific, actionable recommendations for every failing dimension. For example:

> ⚠ **P95 latency exceeds 300 ms target.** Consider adding a CDN layer or optimising the database query on `/v2/users` — 78 % of slow requests originate from a single unindexed join.

Load Curl traces slow requests back to specific endpoints in multi-scenario tests, so you can pinpoint which call in a chain is the bottleneck.

---

## Sharing and exporting

| Action | How |
|---|---|
| **Share a public link** | Click **Share** → toggle **Public link** on → copy URL |
| **Export to PDF** | Click **Export** → **Download PDF** (Pro plan and above) |
| **Embed in a PR** | Paste the public link as a comment; GitHub will render a preview card |
| **Compare to previous run** | Click **Compare** → select any prior run from the dropdown |

---

## Next step

Now that you understand your results, learn how to [**set threshold alerts**](./threshold-alerts) so you get notified automatically when a key metric degrades.
