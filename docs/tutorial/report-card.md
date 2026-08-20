---
id: report-card
title: Reading test reports
sidebar_label: Test reports
sidebar_position: 3
description: Understand latency, throughput, success rates, and PDF export for a Load Curl test run.
---

# Reading test reports

Every completed (or failed) run has a **report** on the test details page at `/tests/{runId}`. Open a run from Dashboard history. While a report is still being calculated, the page shows a processing state — refresh or wait; it is not a letter grade.

---

## What the report contains

The report is built from request summaries, throughput, and latency samples collected during the run.

### Request summary

Counts and rates such as:

- Total, completed, successful, and failed requests
- Timeouts and transport errors
- HTTP 2xx / 3xx / 4xx / 5xx
- Success rate, completion rate, failure rate, timeout rate

Use this to see whether errors are HTTP status codes, timeouts, or connection failures.

### Throughput

- Target RPS (what you configured)
- Average, peak, and minimum RPS achieved
- Successful / completed RPS
- RPS achievement ratio (delivered vs target)
- Response bytes and bytes per second (average and peak)

If average RPS is far below target, the endpoint or network could not keep up, or errors cut throughput.

### Latency

Percentiles and stats, often grouped for **all**, **completed**, **successful**, and **failed** requests:

- Min, average, max, standard deviation
- p50, p75, p90, p95, p99

p95 / p99 describe what slower requests experienced. Compare successful vs failed groups if error latency looks different from happy-path latency.

---

## Live vs final report

| View | When | What you get |
|---|---|---|
| **Live snapshot** | While status is running | In-progress counts and latency so far |
| **Final report** | After the run completes | Full summary, throughput, and latency |
| **PDF** | After the report is ready | Same metrics in a downloadable file |

There is no public share link. Anyone who needs the numbers should be in the same workspace, or you can send the PDF.

---

## Dashboard summary cards

On the home Dashboard, cards show workspace-level totals (your tests vs team tests in a company), running count, and remaining tests. They are not the per-run report — open a run for the full breakdown.

---

## Next step

See [**Dashboard and account**](./dashboard) to manage settings, sessions, and credits.
